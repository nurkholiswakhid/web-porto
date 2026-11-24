export default function SpaceBackgroundFallback() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#141614] to-[#141614]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1.5px 1.5px at 30% 65%, #C8FF00 40%, transparent 100%), " +
            "radial-gradient(1px 1px at 50% 10%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 70% 40%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1.2px 1.2px at 85% 75%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 15% 80%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 90% 15%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1.5px 1.5px at 45% 50%, #C8FF00 30%, transparent 100%)",
        }}
      />
    </div>
  );
}
