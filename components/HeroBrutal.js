const HeroBrutal = React.memo(function HeroBrutal() {
  const scrollToForm = React.useCallback(() => {
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('Button', 'Click', 'Hero CTA - Order');
    }
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToGallery = React.useCallback(() => {
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('Button', 'Click', 'Hero CTA - Portfolio');
    }
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center noise-bg mb-8 pt-32"
      data-name="hero-brutal" 
      data-file="components/HeroBrutal.js"
    >
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.03) 50px,
            rgba(255,255,255,0.03) 51px
          )`
        }}></div>
      </div>
      
      <div className="absolute top-8 left-8 text-6xl opacity-10 font-black transform -rotate-12">
        🔥
      </div>
      <div className="absolute bottom-8 right-8 text-6xl opacity-10 font-black transform rotate-12">
        ⚡
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <div className="mb-6 border-4 border-white inline-block px-4 py-1.5">
          <span className="text-xs font-black tracking-widest">ФРИЛАНСЕР • AI-ДИЗАЙН</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none tracking-tighter">
          AI КРЕАТИВ<br/>
          ЛОГОТИПЫ<br/>
          <span className="bg-[var(--accent-color)] text-black px-4 md:px-6 inline-block">КОНТЕНТ</span>
        </h1>

        <div className="max-w-3xl mx-auto mb-12 border-t-4 border-b-4 border-white py-3">
          <p className="text-base md:text-lg lg:text-xl font-black">
            1-7 ДНЕЙ • 1 ПРАВКА БЕСПЛАТНО
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <button 
            onClick={scrollToForm}
            className="brutal-box px-16 py-6 font-black text-lg md:text-xl hover:bg-[var(--accent-color)] transition-all tracking-wide relative overflow-hidden group"
            style={{
              borderRadius: '100px 100px 80px 80px'
            }}
          >
            <span className="relative z-10">ЗАКАЗАТЬ →</span>
            <div className="absolute inset-x-0 bottom-0 h-2 bg-black opacity-20 group-hover:h-3 transition-all"></div>
          </button>
          <button 
            onClick={scrollToGallery}
            className="brutal-box-inverse px-16 py-6 font-black text-lg md:text-xl hover:bg-white hover:text-black transition-all tracking-wide relative overflow-hidden group"
            style={{
              borderRadius: '100px 100px 80px 80px'
            }}
          >
            <span className="relative z-10">ПОРТФОЛИО</span>
            <div className="absolute inset-x-0 bottom-0 h-2 bg-white opacity-20 group-hover:h-3 transition-all"></div>
          </button>
        </div>
      </div>
    </section>
  );
});
