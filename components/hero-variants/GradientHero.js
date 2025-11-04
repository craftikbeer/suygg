function GradientHero() {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)`
            : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl md:text-[12rem] font-bold mb-8 tracking-tighter leading-none">
          <span
            className="bg-clip-text text-transparent transition-all duration-300"
            style={{
              backgroundImage: isHovered
                ? `linear-gradient(135deg, white ${mousePos.x}%, #888 100%)`
                : 'linear-gradient(to right, white, #888)'
            }}
          >
            NEURO
          </span>
          <br />
          <span className="text-white">CRAFTS</span>
        </h1>

        {!isHovered && (
          <p className="text-xl text-gray-400 animate-pulse">
            Двигайте курсором
          </p>
        )}
      </div>
    </section>
  );
}