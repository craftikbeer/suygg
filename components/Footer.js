function Footer() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 md:py-20 px-4 md:px-8 lg:px-16 border-t-4 border-white" data-name="footer" data-file="components/Footer.js">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase leading-none tracking-tighter">
              NEUROCRAFTS
            </h3>
            <p className="text-gray-300 leading-relaxed font-bold text-sm md:text-base">
              AI-дизайн и нейроразработка премиум-уровня с измеримыми результатами.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-black mb-6 uppercase tracking-widest border-b-2 border-white pb-2">УСЛУГИ</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-white transition-colors text-sm font-bold">
                  Портфолио
                </button>
              </li>
              <li>
                <a href="before-after.html" className="text-gray-300 hover:text-white transition-colors text-sm font-bold">
                  Редизайн
                </a>
              </li>
              <li>
                <a href="admin.html" className="text-gray-300 hover:text-white transition-colors text-sm font-bold">
                  Админ-панель
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-black mb-6 uppercase tracking-widest border-b-2 border-white pb-2">КОМПАНИЯ</h4>
            <ul className="space-y-3 mb-8">
              <li>
                <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-white transition-colors text-sm font-bold">
                  Портфолио
                </button>
              </li>
              <li>
                <a href="admin.html" className="text-gray-300 hover:text-white transition-colors text-sm font-bold">
                  Админ-панель
                </a>
              </li>
            </ul>
            
            <h4 className="text-sm font-black mb-6 uppercase tracking-widest border-b-2 border-white pb-2">КОНТАКТЫ</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:craftsneuro@gmail.com" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold break-all">
                  <div className="icon-mail text-base flex-shrink-0"></div>
                  <span>craftsneuro@gmail.com</span>
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact-form')} className="text-gray-300 hover:text-white transition-colors text-sm font-bold">
                  Форма обратной связи
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-4 border-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs font-black uppercase">
            © 2025 NEUROCRAFTS
          </p>
          <div className="flex gap-6 text-xs font-black uppercase">
            <a href="privacy-policy.html" className="text-white hover:text-[var(--accent-color)] transition-colors">
              Политика
            </a>
            <a href="terms-of-use.html" className="text-white hover:text-[var(--accent-color)] transition-colors">
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
