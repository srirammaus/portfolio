export default function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div className="absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rotate-45 border border-cobalt/30" />
        <div className="absolute inset-[12%] rotate-[22deg] border border-amethyst/25" />
        <div className="absolute inset-[26%] rounded-full border border-silver/10" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(46,91,255,0.22),transparent_65%)]" />
      </div>
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}