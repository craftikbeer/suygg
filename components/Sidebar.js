function Sidebar() {
  const [activeSection, setActiveSection] = React.useState('hero');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPunching, setIsPunching] = React.useState(false);
  const [cracks, setCracks] = React.useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    let lastScroll = 0;
    
    const handleScroll = () => {
      const sections = ['hero', 'services', 'gallery', 'benefits', 'contact-form'];
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section === 'hero' ? '' : section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      const currentScroll = window.scrollY || window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsPunching(true);
    
    const newCracks = [];
    for (let i = 0; i < 8; i++) {
      newCracks.push({
        id: i,
        angle: (i * 45) + Math.random() * 20 - 10,
        length: 80 + Math.random() * 40,
        delay: Math.random() * 0.1
      });
    }
    setCracks(newCracks);
    
    setTimeout(function() {
      setIsExpanded(true);
      setTimeout(function() {
        setIsPunching(false);
        setCracks([]);
      }, 500);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsExpanded(false);
  };

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'hero', icon: 'home', label: 'Главная' },
    { id: 'services', icon: 'layers', label: 'Услуги' },
    { id: 'gallery', icon: 'image', label: 'Портфолио' },
    { id: 'before-after', icon: 'repeat', label: 'До/После' },
    { id: 'contact-form', icon: 'mail', label: 'Контакты' }
  ];

  if (isMobile) {
    return (
      React.createElement(React.Fragment, null,
        React.createElement('header', {
          className: "fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white border-opacity-10",
          style: { 
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease',
            WebkitTransform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
          }
        },
          React.createElement('div', { className: "flex items-center justify-between px-4 py-4" },
            React.createElement('a', {
              href: "index.html",
              className: "text-lg md:text-xl font-black uppercase"
            }, "NEUROCRAFTS"),
            React.createElement('button', {
              onClick: function() { setIsMobileMenuOpen(!isMobileMenuOpen); },
              className: "w-11 h-11 flex items-center justify-center"
            },
              React.createElement('div', {
                className: "icon-" + (isMobileMenuOpen ? 'x' : 'menu') + " text-xl md:text-2xl"
              })
            )
          )
        ),
        React.createElement('div', {
          className: "fixed inset-0 z-40 bg-black transition-all duration-300 " + (isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'),
          style: { top: '64px' }
        },
          React.createElement('nav', { className: "flex flex-col p-4 md:p-6 gap-2" },
            menuItems.map(function(item) {
              if (item.id === 'before-after') return null;
              return React.createElement('button', {
                key: item.id,
                onClick: function() { scrollToSection(item.id); },
                className: "flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 transition-all border-l-4 " + (activeSection === item.id ? 'bg-white text-black border-white font-black' : 'border-transparent hover:border-white hover:bg-white/5 font-bold')
              },
                React.createElement('div', { className: "icon-" + item.icon + " text-lg md:text-xl" }),
                React.createElement('span', { className: "text-xs md:text-sm uppercase tracking-wide" }, item.label)
              );
            }),
            React.createElement('a', {
              href: "before-after.html",
              className: "flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 transition-all border-l-4 border-transparent hover:border-white hover:bg-white/5 font-bold"
            },
              React.createElement('div', { className: "icon-repeat text-lg md:text-xl" }),
              React.createElement('span', { className: "text-xs md:text-sm uppercase tracking-wide" }, "Редизайн")
            )
          )
        )
      )
    );
  }

  return (
    React.createElement(React.Fragment, null,
      isPunching && cracks.map(function(crack) {
        return React.createElement('div', {
          key: crack.id,
          className: "fixed z-40 bg-white pointer-events-none",
          style: {
            left: '80px',
            top: '50%',
            width: crack.length + 'px',
            height: '2px',
            transform: 'rotate(' + crack.angle + 'deg)',
            WebkitTransform: 'rotate(' + crack.angle + 'deg)',
            transformOrigin: 'left center',
            WebkitTransformOrigin: 'left center',
            opacity: 0,
            animation: 'crackAppear 0.3s ease-out ' + crack.delay + 's forwards',
            WebkitAnimation: 'crackAppear 0.3s ease-out ' + crack.delay + 's forwards',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)'
          }
        });
      }),
      React.createElement('aside', {
        className: "fixed left-0 top-0 h-screen z-50 glass-effect border-r border-white border-opacity-10",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { 
          width: isExpanded ? '240px' : '80px', 
          transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
          WebkitTransform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'width 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.3s ease',
          WebkitTransition: 'width 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.3s ease'
        },
        'data-name': "sidebar",
        'data-file': "components/Sidebar.js"
      },
        React.createElement('div', { className: "flex flex-col h-full py-8" },
          React.createElement('a', {
            href: "index.html",
            className: "block px-6 mb-8 md:mb-10 lg:mb-12 text-lg md:text-xl lg:text-2xl font-black whitespace-nowrap overflow-hidden uppercase",
            style: { opacity: isExpanded ? 1 : 0, transition: 'opacity 0.3s ease' }
          }, "NEUROCRAFTS"),
          React.createElement('nav', { className: "flex-1 flex flex-col gap-1 md:gap-1.5 lg:gap-2 px-3 md:px-3.5 lg:px-4" },
            menuItems.map(function(item) {
              if (item.id === 'before-after') return null;
              return React.createElement('button', {
                key: item.id,
                onClick: function() { scrollToSection(item.id); },
                className: "flex items-center gap-2 md:gap-3 lg:gap-4 px-2.5 md:px-3 lg:px-4 py-2.5 md:py-3 lg:py-4 transition-all border-l-4 " + (activeSection === item.id ? 'bg-white text-black border-white font-black' : 'border-transparent hover:border-white hover:bg-white/5 font-bold')
              },
                React.createElement('div', { className: "icon-" + item.icon + " text-base md:text-lg lg:text-xl flex-shrink-0" }),
                React.createElement('span', {
                  className: "whitespace-nowrap overflow-hidden text-xs md:text-sm uppercase tracking-wide",
                  style: { 
                    opacity: isExpanded ? 1 : 0,
                    width: isExpanded ? 'auto' : '0',
                    transition: 'opacity 0.3s ease, width 0.3s ease'
                  }
                }, item.label)
              );
            })
          ),
          React.createElement('div', { className: "px-3 lg:px-4 pb-4" },
            React.createElement('a', {
              href: "before-after.html",
              className: "flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-3 lg:py-4 transition-all border-l-4 border-transparent hover:border-white hover:bg-white/5 font-bold"
            },
              React.createElement('div', { className: "icon-repeat text-lg lg:text-xl flex-shrink-0" }),
              React.createElement('span', {
                className: "whitespace-nowrap overflow-hidden text-xs lg:text-sm uppercase tracking-wide",
                style: { 
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? 'auto' : '0',
                  transition: 'opacity 0.3s ease, width 0.3s ease'
                }
              }, "Редизайн")
            )
          )
        )
      ),
      React.createElement('style', null, `
        @keyframes crackAppear {
          0% { opacity: 0; width: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; width: var(--crack-length, 120px); }
        }
        @-webkit-keyframes crackAppear {
          0% { opacity: 0; width: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; width: var(--crack-length, 120px); }
        }
      `)
    )
  );
}
