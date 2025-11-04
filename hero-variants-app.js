function HeroVariantsApp() {
  const [activeVariant, setActiveVariant] = React.useState(0);

  const variants = [
    { name: 'Curtain Reveal', component: CurtainHero },
    { name: 'Particle Storm', component: ParticleHero },
    { name: 'Liquid Gradient', component: GradientHero },
    { name: 'Text Glitch', component: GlitchHero }
  ];

  const ActiveComponent = variants[activeVariant].component;

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black bg-opacity-80 backdrop-blur-xl p-2 rounded-full border border-white border-opacity-10">
        {variants.map((variant, index) => (
          <button
            key={index}
            onClick={() => setActiveVariant(index)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              activeVariant === index
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>

      <a
        href="index.html"
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-xl rounded-full text-sm hover:bg-opacity-20 transition-all flex items-center gap-2"
      >
        <div className="icon-arrow-left text-base"></div>
        Назад
      </a>

      <ActiveComponent />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HeroVariantsApp />);