const Services = React.memo(function Services() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  const services = React.useMemo(() => [
    {
      title: 'AI КРЕАТИВ ДЛЯ БРЕНДА',
      description: 'AI контент для соцсетей',
      details: 'Быстрые AI-визуалы для ваших соцсетей: фото и видео для постов, сторис и рекламы.',
      icon: 'sparkles',
      price: 'ОТ 2,500₽',
      features: [
        '3 ФОТО AI + ВИДЕО 10 СЕК',
        '2К ФОРМАТ',
        '1 ПРАВКА',
        '1-2 ДНЯ'
      ]
    },
    {
      title: 'ПЕРЕНОС ЛОГОТИПА',
      description: 'Адаптация на любые носители',
      details: 'Ваш логотип на футболках, кружках, визитках, баннерах, упаковке, сайте и соцсетях. 7 вариантов размещения с учётом материалов и форм.',
      icon: 'copy',
      price: 'ОТ 7,000₽',
      features: [
        '7 ПЕРЕНОСОВ',
        'PNG ФОРМАТ',
        '1 ПРАВКА',
        '2-3 ДНЯ'
      ]
    },
    {
      title: 'ПАКЕТ КОНТЕНТА (МЕСЯЦ)',
      description: 'Посты + сторис + визуалы',
      details: 'Полный контент-план на месяц: посты для ленты, сторис, обложки, баннеры. Все форматы готовы к публикации.',
      icon: 'package',
      price: 'ОТ 25,000₽',
      features: [
        '20 ПОСТОВ',
        '15 СТОРИС',
        'ВСЕ ФОРМАТЫ',
        '5-7 ДНЕЙ'
      ]
    }
  ], []);

  const handleServiceOrder = React.useCallback((title) => {
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('Button', 'Click', `Service Order - ${title}`);
    }
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16 flex items-center" 
      data-name="services" 
      data-file="components/Services.js"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-10 text-center leading-none px-4">
          ЧТО Я ДЕЛАЮ
        </h2>
        <div className="max-w-2xl mx-auto mb-16 md:mb-20 border-t-4 border-b-4 border-white py-4 md:py-5">
          <p className="text-base md:text-lg lg:text-xl text-center font-black px-4">
            3 УСЛУГИ • ДОП УСЛУГИ • ЧЁТКИЕ СРОКИ
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto border-4 border-white">
          {services.map((service, index) => (
            <div 
              key={index}
              className="brutal-box p-8 border-r-0 md:border-r-4 last:border-r-0 border-b-4 md:border-b-0 last:border-b-0 flex flex-col"
            >
              <div className="mb-6 md:mb-8 text-6xl md:text-7xl lg:text-8xl font-black opacity-20">{String(index + 1).padStart(2, '0')}</div>
              
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 leading-none">{service.title}</h3>
              <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 font-bold leading-relaxed">{service.description}</p>
              {service.details && (
                <p className="text-xs md:text-sm mb-6 md:mb-8 leading-relaxed opacity-80">
                  {service.details}
                </p>
              )}
              
              <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6 flex-1">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="text-xs font-black border-l-4 border-black pl-2">
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">{service.price}</div>
              <a 
                href="https://t.me/neurocraftsru"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleServiceOrder(service.title)}
                className="brutal-box-inverse px-6 md:px-8 py-4 md:py-5 font-black text-sm md:text-base lg:text-lg text-center hover:bg-white hover:text-black transition-colors tracking-wide"
              >
                ЗАКАЗАТЬ →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
