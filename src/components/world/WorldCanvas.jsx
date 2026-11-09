import { scrollMap } from "@/lib/three/journey";
import { useLocation } from "react-router-dom";
import SceneFallback from "./SceneFallback";
import { useEffect, useRef, useState } from "react";
import { createWorld } from "@/lib/three/world";

export default function WorldCanvas({ reducedMotion = false }) {
  const {pathname} = useLocation();
  const mapRef = useRef(y => 0);
  useEffect(() => {
    const measure = () => { mapRef.current = scrollMap(); };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {observer.disconnect();window.removeEventListener("resize", measure);};
  }, [pathname]);
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let world;
    try {
      world = createWorld(host);
    } catch (error) {
      setFailed(true);
      return undefined;
    }

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let progress = 0;
    let target = 0;
    let touchStart = null;
    let lastTouchAt = 0;
    const isControl = target => target.closest?.("button,a,input,textarea,select,[role=dialog]");
    const renderInteraction = () => {
      if (!reducedMotion) return;
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
      world.update(elapsed, 0, progress, pointer);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") {
        if (!touchStart) return;
        const dx = event.clientX - touchStart.lastX;
        const dy = event.clientY - touchStart.lastY;
        if (Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y) > 8) touchStart.moved = true;
        pointer.tx = Math.max(-1, Math.min(1, pointer.tx - dx / window.innerWidth * 5));
        pointer.ty = Math.max(-1, Math.min(1, pointer.ty - dy / window.innerHeight * 4));
        touchStart.lastX = event.clientX;
        touchStart.lastY = event.clientY;
        renderInteraction();
        return;
      }
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onPointerDown = event => {
      if (event.pointerType !== "touch" || !event.target.closest?.("#home") || isControl(event.target)) return;
      touchStart = { x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, moved: false };
    };
    const onPointerUp = event => {
      if (event.pointerType !== "touch" || !touchStart) return;
      if (!touchStart.moved) {
        lastTouchAt = performance.now();
        world.launch(event.clientX, event.clientY, reducedMotion, true);
      } else if (reducedMotion) {
        renderInteraction();
      }
      touchStart = null;
    };

    const readScroll = () => {
      target = mapRef.current(window.scrollY);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.2);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.2);
      progress += (target - progress) * Math.min(1, dt * 4);

      if (document.hidden) return;
      readScroll();
      elapsed += dt;
      world.update(elapsed, dt, progress, pointer);
    };

    const onArrow = event => {
      if (event.target.closest?.("input,textarea,select,button,a,[contenteditable=true],[role=dialog]")) return;
      const step = .16;
      if (event.key === "ArrowLeft") pointer.tx = Math.max(-1, pointer.tx-step);
      if (event.key === "ArrowRight") pointer.tx = Math.min(1, pointer.tx+step);
      if (event.key === "ArrowUp") pointer.ty = Math.max(-1, pointer.ty-step);
      if (event.key === "ArrowDown") pointer.ty = Math.min(1, pointer.ty+step);
    };
    const onTap=event=>{
      if (performance.now() - lastTouchAt < 700) return;
      if(!event.target.closest?.("#home") || isControl(event.target))return;
      world.launch(event.clientX,event.clientY,reducedMotion);
    };
    const onTouchStart = event => {
      const touch = event.touches[0];
      if (!touch || !event.target.closest?.("#home") || isControl(event.target)) return;
      touchStart = { x: touch.clientX, y: touch.clientY, lastX: touch.clientX, lastY: touch.clientY, moved: false };
    };
    const onTouchMove = event => {
      if (!touchStart) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - touchStart.lastX;
      const dy = touch.clientY - touchStart.lastY;
      if (Math.hypot(touch.clientX - touchStart.x, touch.clientY - touchStart.y) > 8) touchStart.moved = true;
      pointer.tx = Math.max(-1, Math.min(1, pointer.tx - dx / window.innerWidth * 5));
      pointer.ty = Math.max(-1, Math.min(1, pointer.ty - dy / window.innerHeight * 4));
      touchStart.lastX = touch.clientX;
      touchStart.lastY = touch.clientY;
      renderInteraction();
    };
    const onTouchEnd = event => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      if (touch && !touchStart.moved) {
        lastTouchAt = performance.now();
        world.launch(touch.clientX, touch.clientY, reducedMotion, true);
      } else if (reducedMotion) {
        renderInteraction();
      }
      touchStart = null;
    };
    const onTouchCancel = () => { touchStart = null; };
    window.addEventListener("click",onTap);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.addEventListener("keydown", onArrow);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", world.resize);
    readScroll();

    if (!reducedMotion) raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("click",onTap);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("keydown", onArrow);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", world.resize);
      world.dispose();
    };
  }, [reducedMotion]);


  if (failed) return <SceneFallback />;
  return <div ref={hostRef} className="absolute inset-0 touch-pan-y" />;
}
