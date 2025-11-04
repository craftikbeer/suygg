const Benefits = React.memo(function Benefits() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  const benefits = React.useMemo(() => [
    {
      icon: 'shield-check',
      title: 'ГАРАНТИЯ',
      lines: ['1 ПРАВКА БЕСПЛАТНО', 'ВОЗВРАТ 50% ЕСЛИ НЕ ТО']
    },
    {
      icon: 'zap',
      title: 'СКОРОСТЬ',
      lines: ['ПОРТРЕТ 1-2 ДНЯ', 'ЛОГОТИП 2-3 ДНЯ', 'УПАКОВКА НЕДЕЛЯ']
    },
    {
      icon: 'target',
      title: 'ПРЯМАЯ СВЯЗЬ',
      lines: ['БЕЗ ПОСРЕДНИКОВ', 'ПИШИТЕ В TELEGRAM']
    }
  ], []);

  return (
    <section 
      id="benefits" 
      ref={sectionRef}
      className="py-20 md:py-32 px-4 md:px-8 lg:px-16" 
      data-name="benefits" 
      data-file="components/Benefits.js"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-10 text-center leading-none px-4">
          ПОЧЕМУ Я
        </h2>
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 border-t-4 border-b-4 border-white py-4 md:py-5">
          <p className="text-base md:text-lg lg:text-xl text-center font-black px-4">
            МЕНЬШЕ ЦЕНА • БОЛЬШЕ СКОРОСТЬ • ПРЯМАЯ СВЯЗЬ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto border-4 border-white">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="brutal-box-inverse p-8 md:p-10 lg:p-12 border-r-0 md:border-r-4 last:border-r-0 border-b-4 md:border-b-0 last:border-b-0"
            >
              <div className="text-7xl md:text-8xl lg:text-9xl mb-6 md:mb-8 opacity-20">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-none">{benefit.title}</h3>
              <div className="text-sm md:text-base lg:text-lg font-black leading-relaxed">
                {benefit.lines.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
