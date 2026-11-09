import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeutronStarScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    let frame = 0;
    let disposed = false;
    let texture;
    let scene;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x030611, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
      camera.position.set(0, 0, 6.4);

      const starGroup = new THREE.Group();
      starGroup.position.set(0.55, 0.02, 0);
      scene.add(starGroup);
      const loader = new THREE.TextureLoader();
      texture = loader.load("/media/neutron-star-surface.png", (loaded) => {
        if (disposed) return;
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.anisotropy = renderer.capabilities.getMaxAnisotropy();
      });
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(1.52, 64, 48),
        new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9,
          metalness: 0.06,
          emissive: new THREE.Color("#382455"),
          emissiveMap: texture,
          emissiveIntensity: 0.22,
        }),
      );
      starGroup.add(star);

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd9a956, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
      const ringBack = new THREE.Mesh(new THREE.TorusGeometry(1.94, 0.012, 8, 180), ringMaterial);
      ringBack.rotation.set(1.1, 0.05, -0.18);
      ringBack.scale.set(1.42, 0.66, 1);
      ringBack.position.z = -0.08;
      starGroup.add(ringBack);
      const ringFront = new THREE.Mesh(new THREE.TorusGeometry(1.94, 0.018, 8, 180), ringMaterial.clone());
      ringFront.material.opacity = 0.9;
      ringFront.rotation.copy(ringBack.rotation);
      ringFront.scale.copy(ringBack.scale);
      ringFront.position.z = 0.08;
      starGroup.add(ringFront);

      scene.add(new THREE.AmbientLight(0x9ebeff, 1.15));
      const key = new THREE.DirectionalLight(0x8dcaff, 3.4);
      key.position.set(-3, 3, 5);
      scene.add(key);
      const gold = new THREE.PointLight(0xffca72, 3.8, 12);
      gold.position.set(3, -1, 3);
      scene.add(gold);

      const resize = () => {
        const width = host.clientWidth || 1;
        const height = host.clientHeight || 1;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const wide = width / height > 1.15;
        starGroup.position.set(wide ? 0.45 : 0.1, wide ? 0 : 0.1, 0);
        starGroup.scale.setScalar(wide ? 0.92 : 0.8);
        renderer.render(scene, camera);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const start = performance.now();
      const animate = (now) => {
        if (disposed) return;
        frame = requestAnimationFrame(animate);
        if (!reduceMotion) {
          const time = (now - start) / 1000;
          star.rotation.y = time * 0.075;
          star.rotation.x = Math.sin(time * 0.12) * 0.035;
          ringBack.rotation.z = -0.18 + Math.sin(time * 0.09) * 0.025;
          ringFront.rotation.z = ringBack.rotation.z;
        }
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(animate);

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        scene.traverse((object) => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material?.dispose();
        });
        texture?.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch {
      renderer?.dispose();
      return undefined;
    }
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
