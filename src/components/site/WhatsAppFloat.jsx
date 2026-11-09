import { useEffect, useRef, useState } from "react";

const message = "Hi , Just checked your website could you share more";
const whatsappUrl = `https://wa.me/919080010758?text=${encodeURIComponent(message)}`;
const sparks = Array.from({ length: 18 }, (_, index) => index);

export default function WhatsAppFloat() {
  const [casting, setCasting] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const timer = useRef(null);

  useEffect(() => {
    const resetAfterReturn = () => {
      window.clearTimeout(timer.current);
      timer.current = null;
      setCasting(false);
    };
    window.addEventListener("pageshow", resetAfterReturn);
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener("pageshow", resetAfterReturn);
    };
  }, []);

  const beginChat = (event) => {
    if (casting) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setCasting(true);
    timer.current = window.setTimeout(() => {
      timer.current = null;
      window.location.assign(whatsappUrl);
    }, 1050);
  };

  return (
    <>
      <button
        type="button"
        onClick={beginChat}
        aria-label="Chat with me on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-[#365bff] via-[#6552ef] to-[#8b45ed] text-white shadow-[0_5px_22px_rgba(91,78,255,0.42)] transition duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3.2A12.72 12.72 0 0 0 5.18 22.56L3.5 28.7l6.3-1.65A12.77 12.77 0 1 0 16.04 3.2Zm0 23.2c-1.9 0-3.77-.5-5.4-1.48l-.39-.23-3.74.98 1-3.64-.25-.4a10.38 10.38 0 1 1 8.78 4.77Zm5.7-7.77c-.31-.16-1.85-.91-2.14-1.01-.29-.1-.5-.16-.71.16-.2.31-.81 1.01-.99 1.22-.18.2-.36.23-.67.08-.31-.16-1.31-.48-2.49-1.53-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.02-.54-.08-.16-.71-1.7-.97-2.32-.26-.61-.52-.53-.71-.54l-.61-.01c-.21 0-.54.08-.83.39-.28.31-1.08 1.06-1.08 2.58s1.1 2.99 1.26 3.2c.15.2 2.16 3.3 5.24 4.62.73.31 1.3.5 1.75.64.74.24 1.41.21 1.94.13.59-.09 1.85-.76 2.11-1.49.26-.74.26-1.37.18-1.5-.08-.13-.28-.2-.59-.36Z" />
        </svg>
      </button>

      {casting && (
        <div
          className="whatsapp-cast"
          style={{ "--cast-x": `${origin.x}px`, "--cast-y": `${origin.y}px`, zIndex: 9999999999 }}
          aria-hidden="true"
        >
          <div className="whatsapp-cast__flash" />
          <div className="whatsapp-cast__halo whatsapp-cast__halo--one" />
          <div className="whatsapp-cast__halo whatsapp-cast__halo--two" />
          <div className="whatsapp-cast__core" />
          {sparks.map((spark) => (
            <i key={spark} className="whatsapp-cast__spark" style={{ "--spark-index": spark }} />
          ))}
        </div>
      )}
    </>
  );
}
