function CallHeader({ topic, room }: { topic: string; room: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-4 py-3 
      bg-linear-to-b from-black/60 to-transparent
      flex items-center justify-between">

      <div>
        <h3 className="text-white font-bold text-sm">{topic} • Voice Call</h3>
        <p className="text-xs text-emerald-400 font-semibold">
          Connected to {room}
        </p>
      </div>

      <span className="text-xs text-white/70 font-mono">
        LIVE
      </span>
    </div>
  );
}
export default CallHeader;
