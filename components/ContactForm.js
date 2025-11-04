const ContactForm = React.memo(function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [focusedField, setFocusedField] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const lastSubmitTime = React.useRef(0);

  const validateForm = React.useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    if (!formData.message.trim()) newErrors.message = 'Введите сообщение';
    return newErrors;
  }, [formData]);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    
    // Rate limiting: max 1 submit per 10 seconds
    const now = Date.now();
    if (now - lastSubmitTime.current < 10000) {
      setErrors({ submit: 'Подождите 10 секунд перед повторной отправкой' });
      return;
    }
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    lastSubmitTime.current = now;
    
    try {
      // Проверка наличия EmailJS
      if (typeof emailjs === 'undefined') {
        throw new Error('Библиотека EmailJS не загружена');
      }
      
      if (!CONFIG.EMAILJS.PUBLIC_KEY || !CONFIG.EMAILJS.SERVICE_ID || !CONFIG.EMAILJS.TEMPLATE_ID) {
        throw new Error('Отсутствуют данные для отправки');
      }
      
      // Отправка через EmailJS на craftsneuro@gmail.com
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'craftsneuro@gmail.com'
      };
      
      console.log('Sending email with params:', emailParams);
      
      const response = await emailjs.send(
        CONFIG.EMAILJS.SERVICE_ID,
        CONFIG.EMAILJS.TEMPLATE_ID,
        emailParams
      );
      
      console.log('EmailJS response:', response);
      
      // Сохранение в LocalStorage (как резервная копия)
      const submission = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        submittedAt: new Date().toISOString()
      };
      
      const stored = localStorage.getItem('neurocrafts_submissions');
      const data = stored ? JSON.parse(stored) : { submissions: [] };
      data.submissions.push(submission);
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem('neurocrafts_submissions', JSON.stringify(data));
      
      // Track form submission in GA4
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Form', 'Submit', 'Contact Form Success');
      }
      
      setSubmitted(true);
      setErrors({});
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 15000);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', JSON.stringify({
        message: error?.message || 'Unknown error',
        text: error?.text || 'No error text',
        status: error?.status || 'No status',
        name: error?.name || 'No error name',
        stack: error?.stack || 'No stack trace'
      }, null, 2));
      
      let errorMessage = 'Ошибка отправки. ';
      
      if (error?.text) {
        errorMessage += error.text;
      } else if (error?.message) {
        errorMessage += error.message;
      } else if (typeof error === 'string') {
        errorMessage += error;
      } else {
        errorMessage += 'Проверьте настройки EmailJS или подключение к интернету.';
      }
      
      setErrors({ submit: errorMessage });
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const handleChange = React.useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData]);

  return (
    <section id="contact-form" className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16 flex items-center" data-name="contact-form" data-file="components/ContactForm.js">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-10 text-center leading-none px-4">
          ГОТОВЫ НАЧАТЬ?
        </h2>
        <div className="max-w-2xl mx-auto mb-10 md:mb-12 border-t-4 border-b-4 border-white py-4 md:py-5">
          <p className="text-base md:text-lg lg:text-xl text-center font-black px-4">
            ФОРМА • ОТВЕТ 24 ЧАСА
          </p>
        </div>
        <form onSubmit={handleSubmit} className="brutal-box-inverse p-6 md:p-10 lg:p-12 xl:p-16">
          <div className="mb-6 relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="ИМЯ"
              required
              className={`w-full bg-black border-2 py-4 md:py-5 lg:py-6 px-4 md:px-5 lg:px-6 text-base md:text-lg lg:text-xl font-bold focus:outline-none transition-all uppercase placeholder-gray-500 ${
                errors.name ? 'border-red-500' : 'border-white focus:border-[var(--accent-color)]'
              }`}
              style={{
                transform: focusedField === 'name' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.name && <p className="text-[var(--red)] text-sm mt-2 font-bold">{errors.name}</p>}
          </div>
          <div className="mb-6 relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="EMAIL"
              required
              className={`w-full bg-black border-2 py-5 md:py-6 px-6 text-lg md:text-xl font-bold focus:outline-none transition-all uppercase placeholder-gray-500 ${
                errors.email ? 'border-red-500' : 'border-white focus:border-[var(--accent-color)]'
              }`}
              style={{
                transform: focusedField === 'email' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.email && <p className="text-[var(--red)] text-sm mt-2 font-bold">{errors.email}</p>}
          </div>
          <div className="mb-8 relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              placeholder="ЧТО НУЖНО СДЕЛАТЬ?"
              required
              rows="6"
              className={`w-full bg-black border-2 py-5 md:py-6 px-6 text-lg md:text-xl font-bold focus:outline-none transition-all resize-none uppercase placeholder-gray-500 ${
                errors.message ? 'border-red-500' : 'border-white focus:border-[var(--accent-color)]'
              }`}
              style={{
                transform: focusedField === 'message' ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            />
            {errors.message && <p className="text-[var(--red)] text-sm mt-2 font-bold">{errors.message}</p>}
          </div>

          {errors.submit && <p className="text-[var(--red)] text-lg mb-4 font-bold">{errors.submit}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-6 md:py-7 font-black text-xl md:text-2xl uppercase tracking-wide transition-all transform hover:scale-105 border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed ${
              submitted 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-black hover:bg-[var(--accent-color)]'
            }`}
          >
            {isSubmitting ? 'ОТПРАВКА...' : submitted ? '✓ ОТПРАВЛЕНО! СКОРО ОТВЕТЮ' : 'ОТПРАВИТЬ ЗАЯВКУ'}
          </button>
          
          {submitted && (
            <div className="mt-6 p-6 bg-green-500 bg-opacity-20 border-2 border-green-500 rounded-2xl">
              <p className="text-lg font-black mb-2 uppercase text-green-400">✓ Успешно отправлено!</p>
              <p className="text-sm font-bold text-gray-300">
                Ваше сообщение получено. Мы свяжемся с вами в ближайшее время на указанный email.
              </p>
            </div>
          )}
          
          <div className="mt-10 pt-10 border-t-4 border-white">
            <p className="text-center mb-6 text-sm md:text-base font-black uppercase">ИЛИ ПО ДРУГОМУ:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-0">
                <a 
                  href="mailto:craftsneuro@gmail.com"
                  className="flex items-center justify-center gap-4 px-8 md:px-10 py-5 md:py-6 bg-white text-black border-2 border-black hover:bg-[var(--accent-color)] transition-all font-black uppercase text-base md:text-lg border-b-0 sm:border-b-2 sm:border-r-0"
                >
                  <div className="icon-mail text-xl md:text-2xl"></div>
                  <span>Email</span>
                </a>
              <a 
                href="https://t.me/neurocraftsru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 px-8 md:px-10 py-5 md:py-6 bg-white text-black border-2 border-black hover:bg-[var(--accent-color)] transition-all font-black uppercase text-base md:text-lg"
              >
                <div className="icon-message-circle text-xl md:text-2xl"></div>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
});
