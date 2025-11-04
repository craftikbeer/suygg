function CurtainHero() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80"
        alt="Space"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 bg-black transition-all duration-1000 ease-out"
        style={{
          clipPath: isHovered
            ? `circle(${Math.max(window.innerWidth, window.innerHeight)}px at ${mousePos.x * 100}% ${mousePos.y * 100}%)`
            : 'circle(0px at 50% 50%)'
        }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl md:text-[12rem] font-bold mb-8 tracking-tighter leading-none">
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            NEURO
          </span>
          <br />
          <span className="text-white">CRAFTS</span>
        </h1>

        {!isHovered && (
          <p className="text-xl text-gray-400 animate-pulse">
            Наведите для раскрытия
          </p>
        )}
      </div>
    </section>
  );
}