function BeforeAfterSlider({ project, index }) {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const containerRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setIsDragging(false));
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', () => setIsDragging(false));
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={sectionRef}
      className="glass-effect rounded-3xl overflow-hidden"
      style={{
        opacity: Math.max(0.3, Math.min(1, scrollProgress)),
        transform: `translateY(${(1 - scrollProgress) * 50}px)`
      }}
      data-name="before-after-slider" 
      data-file="components/BeforeAfterSlider.js"
    >
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6">
          <span className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--yellow)] opacity-30">0{index + 1}</span>
          <div className="flex-1 md:pt-2">
            <span className="inline-block px-4 py-2 bg-[var(--yellow)] text-black text-sm font-black uppercase transform -skew-x-6 mb-4">
              {project.category}
            </span>
            <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">{project.title}</h3>
            <p className="text-xl text-[var(--yellow)] font-black mb-4 leading-relaxed">
              "{project.description}"
            </p>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-96 md:h-[600px] cursor-ew-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <img
          src={project.after}
          alt={`${project.title} - после редизайна`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={project.before}
            alt={`${project.title} - до редизайна`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform hover:scale-110">
            <div className="icon-chevrons-left-right text-2xl text-black"></div>
          </div>
        </div>

        <div className="absolute top-4 md:top-8 left-4 md:left-8 px-3 md:px-5 py-1.5 md:py-2 bg-black border-2 border-white/30 text-xs md:text-sm font-black uppercase">
          ДО
        </div>
        <div className="absolute top-4 md:top-8 right-4 md:right-8 px-3 md:px-5 py-1.5 md:py-2 bg-[var(--yellow)] text-black text-xs md:text-sm font-black uppercase border-2 border-black">
          ПОСЛЕ
        </div>
      </div>
    </div>
  );
}