const MarqueeTicker = React.memo(function MarqueeTicker() {
  const tickerItems = React.useMemo(() => [
    'AI КРЕАТИВ',
    'ЛОГОТИПЫ',
    'УПАКОВКА',
    'КОНТЕНТ',
    'БЫСТРО',
    'ДЁШЕВО',
    'КАЧЕСТВЕННО',
    'БАЗА',
    'ОГОНЬ',
    'ШЕДЕВРАЛЬНО',
    'БЕЗ ВОДЫ',
    'ПРЯМО В ТОЧКУ'
  ], []);

  return (
    <div 
      className="relative overflow-hidden border-y-4 border-white bg-[var(--accent-color)] py-6 md:py-8"
      data-name="marquee-ticker"
      data-file="components/MarqueeTicker.js"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex">
            {tickerItems.map((item, index) => (
              <React.Fragment key={`${setIndex}-${index}`}>
                <span className="text-2xl md:text-3xl lg:text-4xl font-black text-black px-8">
                  {item}
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-black text-black px-4">
                  •
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
});