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
      className="relative min-h-screen flex items-center justify-center noise-bg"
      data-name="hero-brutal" 
      data-file="components/HeroBrutal.js"
    >
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <div className="mb-8 border-4 border-white inline-block px-6 py-2">
          <span className="text-sm font-black tracking-widest">ФРИЛАНСЕР • AI-ДИЗАЙН</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-8 md:mb-10 leading-none tracking-tighter">
          AI КРЕАТИВ<br/>
          ЛОГОТИПЫ<br/>
          <span className="bg-[var(--accent-color)] text-black px-6 md:px-8 inline-block">КОНТЕНТ</span>
        </h1>

        <div className="max-w-3xl mx-auto mb-6 md:mb-8 border-4 border-white px-6 md:px-8 py-4 md:py-5 inline-block">
          <p className="text-xl md:text-2xl lg:text-3xl font-black">
            ЦЕНЫ ОТ 2,500₽
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 md:mb-16 border-t-4 border-b-4 border-white py-5 md:py-6">
          <p className="text-lg md:text-xl lg:text-2xl font-black">
            1-7 ДНЕЙ • 1 ПРАВКА БЕСПЛАТНО
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-0 justify-center max-w-2xl mx-auto">
          <button 
            onClick={scrollToForm}
            className="brutal-box px-16 py-7 font-black text-xl md:text-2xl hover:bg-[var(--accent-color)] transition-colors border-r-0 sm:border-r-4 border-b-4 sm:border-b-0 tracking-wide"
          >
            ЗАКАЗАТЬ →
          </button>
          <button 
            onClick={scrollToGallery}
            className="brutal-box-inverse px-16 py-7 font-black text-xl md:text-2xl hover:bg-white hover:text-black transition-colors tracking-wide"
          >
            ПОРТФОЛИО
          </button>
        </div>
      </div>
    </section>
  );
});
