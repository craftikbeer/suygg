function GlitchHero() {
  const [isGlitching, setIsGlitching] = React.useState(false);
  const [glitchOffset, setGlitchOffset] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!isGlitching) return;

    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isGlitching]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
              opacity: isGlitching ? Math.random() : 0.1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <h1
          className="text-8xl md:text-[12rem] font-bold mb-8 tracking-tighter leading-none relative"
          style={{
            transform: isGlitching
              ? `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`
              : 'none'
          }}
        >
          <span className="relative">
            <span className="text-white">NEURO</span>
            {isGlitching && (
              <>
                <span
                  className="absolute top-0 left-0 text-red-500 opacity-70"
                  style={{ transform: 'translate(-2px, 0)' }}
                >
                  NEURO
                </span>
                <span
                  className="absolute top-0 left-0 text-cyan-500 opacity-70"
                  style={{ transform: 'translate(2px, 0)' }}
                >
                  NEURO
                </span>
              </>
            )}
          </span>
          <br />
          <span className="text-white">CRAFTS</span>
        </h1>

        {!isGlitching && (
          <p className="text-xl text-gray-400 animate-pulse">
            Наведите для глитча
          </p>
        )}
      </div>
    </section>
  );
}