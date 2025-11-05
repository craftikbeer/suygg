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
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-white transition-transform duration-300"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
        }}
        data-name="header"
        data-file="components/Header.js"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-20">
          <a 
            href="index.html"
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter"
          >
            NEUROCRAFTS
          </a>

          <nav className="hidden md:flex items-center gap-0 border-4 border-white">
            <a
              href="before-after.html"
              className="px-8 py-4 font-black text-sm uppercase bg-white text-black hover:bg-[var(--accent-color)] transition-all border-r-4 border-black"
            >
              РЕДИЗАЙН
            </a>
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-8 py-4 font-black text-sm uppercase hover:bg-white hover:text-black transition-all ${index < menuItems.length - 1 ? 'border-r-4 border-white' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-14 h-14 border-4 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <div className={`icon-${isMobileMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black md:hidden"
          style={{ top: '80px' }}
        >
          <nav className="flex flex-col p-0 gap-0 border-4 border-white m-4">
            <a
              href="before-after.html"
              className="px-6 py-5 font-black text-base uppercase text-center bg-white text-black border-b-4 border-black hover:bg-[var(--accent-color)] transition-all"
            >
              РЕДИЗАЙН
            </a>
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-6 py-5 font-black text-base uppercase text-center hover:bg-white hover:text-black transition-all ${index < menuItems.length - 1 ? 'border-b-4 border-white' : ''}`}
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
