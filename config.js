// Configuration - DO NOT commit this file with real credentials
// Use environment variables in production

const CONFIG = {
  // Admin credentials (use secure backend auth in production)
  ADMIN_PASSWORD_HASH: 'e5b5a7e7c0c3f5e8e5f7a7f7c0c3f5e8e5f7a7f7c0c3f5e8e5f7a7f7c0c3f5e8',
  
  // EmailJS credentials
  EMAILJS: {
    PUBLIC_KEY: window.EMAILJS_PUBLIC_KEY || 'xYecC-27qntuOhKBp',
    SERVICE_ID: window.EMAILJS_SERVICE_ID || 'service_fck3vzn',
    TEMPLATE_ID: window.EMAILJS_TEMPLATE_ID || 'template_qpb4e8i'
  },
  
  // Analytics
  ANALYTICS: {
    GA_ID: 'G-TQVEB29TNF'
  },
  
  // API endpoints
  API: {
    PROJECTS: 'data/projects.json',
    BEFORE_AFTER: 'data/before-after.json'
  }
};

// Freeze config to prevent modifications
if (typeof Object.freeze === 'function') {
  Object.freeze(CONFIG);
  Object.freeze(CONFIG.EMAILJS);
  Object.freeze(CONFIG.ANALYTICS);
  Object.freeze(CONFIG.API);
}