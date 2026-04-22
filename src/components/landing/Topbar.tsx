export default function Topbar() {
  return (
    <div className="topbar-glow text-white text-[13px] font-medium text-center py-2.5 px-4 relative z-[60]">
      <span className="inline-flex items-center gap-2 relative z-10">
        <span className="opacity-90">✦</span>
        <span>Audit offert — 48 h pour cartographier vos leviers de croissance</span>
        <span className="opacity-60">·</span>
        <span className="underline decoration-white/40 underline-offset-2 hover:decoration-white transition">En profiter</span>
      </span>
    </div>
  );
}
