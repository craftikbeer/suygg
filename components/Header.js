const Header = React.memo(function Header() {
  const isVisible = useScrollVisibility(300);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollToSection = React.useCallback((id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const menuItems = React.useMemo(() => [
    { id: 'services', label: 'УСЛУГИ' },
    { id: 'contact-form', label: 'КОНТАКТЫ' }
  ], []);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-white py-4 transition-transform duration-300"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
        }}
        data-name="header"
        data-file="components/Header.js"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
          <a 
            href="index.html"
            className="text-xl md:text-2xl font-black uppercase"
          >
            NEUROCRAFTS
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a
              href="before-after.html"
              className="px-4 py-2 font-black text-sm uppercase hover:bg-white hover:text-black transition-all"
            >
              РЕДИЗАЙН
            </a>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 font-black text-sm uppercase hover:bg-white hover:text-black transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center"
          >
            <div className={`icon-${isMobileMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black md:hidden"
          style={{ top: '72px' }}
        >
          <nav className="flex flex-col p-4 gap-2">
            <a
              href="before-after.html"
              className="px-6 py-4 font-black text-sm uppercase text-left border-l-4 border-transparent hover:border-white hover:bg-white/5 transition-all"
            >
              РЕДИЗАЙН
            </a>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-6 py-4 font-black text-sm uppercase text-left border-l-4 border-transparent hover:border-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
});
