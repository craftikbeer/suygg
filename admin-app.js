class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Что-то пошло не так</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
            >
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminApp() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('portfolio');
    const [projects, setProjects] = React.useState([]);
    const [beforeAfterProjects, setBeforeAfterProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [editingProject, setEditingProject] = React.useState(null);

  React.useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth === CONFIG.ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
    }
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) {
      loadProjectsFromLocalStorage();
      loadBeforeAfterFromLocalStorage();
    }
  }, [isAuthenticated]);

    const handleLogin = async (e) => {
      e.preventDefault();
      
      const ADMIN_PASSWORD = 'RODINA192266';
      
      try {
        if (password === ADMIN_PASSWORD) {
          let hashHex;
          if (window.crypto && window.crypto.subtle) {
            try {
              const encoder = new TextEncoder();
              const data = encoder.encode(password);
              const hashBuffer = await crypto.subtle.digest('SHA-256', data);
              const hashArray = [];
              const view = new Uint8Array(hashBuffer);
              for (let i = 0; i < view.length; i++) {
                hashArray.push(view[i]);
              }
              hashHex = hashArray.map(function(b) {
                return ('00' + b.toString(16)).slice(-2);
              }).join('');
            } catch (cryptoError) {
              console.warn('Crypto API failed, using simple hash');
              hashHex = 'e5b5a7e7c0c3f5e8e5f7a7f7c0c3f5e8e5f7a7f7c0c3f5e8e5f7a7f7c0c3f5e8';
            }
          } else {
            hashHex = 'e5b5a7e7c0c3f5e8e5f7a7f7c0c3f5e8e5f7a7f7c0c3f5e8e5f7a7f7c0c3f5e8';
          }
          
          setIsAuthenticated(true);
          try {
            sessionStorage.setItem('admin_auth', hashHex);
          } catch (storageError) {
            console.warn('SessionStorage not available');
          }
          setError('');
        } else {
          setError('Неверный пароль');
          setPassword('');
        }
      } catch (err) {
        console.error('Auth error:', err);
        setError('Ошибка аутентификации');
      }
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('admin_auth');
      setPassword('');
    };

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" data-name="admin-login" data-file="admin-app.js">
          <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-md w-full border-2 border-white/20">
            <h1 className="text-4xl md:text-5xl font-black mb-8 text-center uppercase">
              <span className="text-[var(--yellow)]">ADMIN</span> ПАНЕЛЬ
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase font-bold">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-2 border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--yellow)] transition-all"
                  placeholder="Введите пароль"
                  autoFocus
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 font-bold">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[var(--yellow)] text-black font-black text-lg uppercase tracking-wide hover:bg-white transition-all border-2 border-black"
              >
                Войти
              </button>
            </form>
            <a 
              href="index.html"
              className="block text-center text-gray-400 hover:text-white transition-colors mt-6"
            >
              ← Вернуться на главную
            </a>
          </div>
        </div>
      );
    }

    const loadProjectsFromLocalStorage = () => {
      try {
        const stored = localStorage.getItem('neurocrafts_projects');
        if (stored) {
          const data = JSON.parse(stored);
          setProjects(data.projects || []);
          setLoading(false);
          return;
        }
        
        // Если нет в localStorage, устанавливаем пустой массив и пробуем загрузить
        setProjects([]);
        setLoading(false);
        
        fetch('data/projects.json')
          .then(res => {
            if (res.ok) return res.json();
            throw new Error('Fetch failed');
          })
          .then(data => {
            setProjects(data.projects || []);
            localStorage.setItem('neurocrafts_projects', JSON.stringify(data));
          })
          .catch(err => {
            console.log('Не удалось загрузить из файла:', err.message);
          });
      } catch (error) {
        console.error('Ошибка загрузки проектов:', error);
        setProjects([]);
        setLoading(false);
      }
    };

    const loadBeforeAfterFromLocalStorage = () => {
      try {
        const stored = localStorage.getItem('neurocrafts_beforeafter');
        if (stored) {
          const data = JSON.parse(stored);
          setBeforeAfterProjects(data.projects || []);
          return;
        }
        
        setBeforeAfterProjects([]);
        
        fetch('data/before-after.json')
          .then(res => {
            if (res.ok) return res.json();
            throw new Error('Fetch failed');
          })
          .then(data => {
            setBeforeAfterProjects(data.projects || []);
            localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(data));
          })
          .catch(err => {
            console.log('Не удалось загрузить before-after из файла:', err.message);
          });
      } catch (error) {
        console.error('Ошибка загрузки до/после:', error);
        setBeforeAfterProjects([]);
      }
    };

    const handleEdit = (project, type = 'portfolio') => {
      setEditingProject({ ...project, type });
      setShowForm(true);
    };

    const handleDelete = (projectId, type = 'portfolio') => {
      if (confirm('Вы уверены, что хотите удалить этот проект?')) {
        try {
          if (type === 'portfolio') {
            const filtered = projects.filter(p => p.id !== projectId);
            setProjects(filtered);
            const data = { lastUpdated: new Date().toISOString(), projects: filtered };
            localStorage.setItem('neurocrafts_projects', JSON.stringify(data));
          } else {
            const filtered = beforeAfterProjects.filter(p => p.id !== projectId);
            setBeforeAfterProjects(filtered);
            const data = { lastUpdated: new Date().toISOString(), projects: filtered };
            localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(data));
          }
        } catch (error) {
          console.error('Ошибка удаления:', error);
          alert('Не удалось удалить проект');
        }
      }
    };

    const handleFormClose = () => {
      setShowForm(false);
      setEditingProject(null);
      loadProjectsFromLocalStorage();
      loadBeforeAfterFromLocalStorage();
    };

    const handleExport = () => {
      const exportData = {
        exportDate: new Date().toISOString(),
        portfolioProjects: projects,
        beforeAfterProjects: beforeAfterProjects
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neurocrafts-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const handleImport = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        if (!data.portfolioProjects && !data.beforeAfterProjects) {
          alert('Неверный формат файла');
          return;
        }

        if (confirm(`Импортировать данные? Это заменит текущие данные.`)) {
          if (data.portfolioProjects) {
            setProjects(data.portfolioProjects);
            const projectsData = { lastUpdated: new Date().toISOString(), projects: data.portfolioProjects };
            localStorage.setItem('neurocrafts_projects', JSON.stringify(projectsData));
          }
          
          if (data.beforeAfterProjects) {
            setBeforeAfterProjects(data.beforeAfterProjects);
            const beforeAfterData = { lastUpdated: new Date().toISOString(), projects: data.beforeAfterProjects };
            localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(beforeAfterData));
          }
          
          alert('Данные успешно импортированы!');
        }
      } catch (error) {
        console.error('Ошибка импорта:', error);
        alert('Не удалось импортировать файл. Проверьте формат.');
      }
      
      e.target.value = '';
    };

    return (
      <div className="min-h-screen p-4 md:p-8 lg:p-12" data-name="admin-app" data-file="admin-app.js">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Админ-панель</h1>
              <div className="flex items-center gap-4">
                <a href="index.html" className="text-gray-400 hover:text-white transition-colors">
                  ← Вернуться на сайт
                </a>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition-colors font-semibold"
                >
                  Выйти
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all text-sm md:text-base ${
                  activeTab === 'portfolio' 
                    ? 'bg-white text-black' 
                    : 'glass-effect hover:bg-opacity-10'
                }`}
              >
                Портфолио
              </button>
              <button
                onClick={() => setActiveTab('beforeafter')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'beforeafter' 
                    ? 'bg-white text-black' 
                    : 'glass-effect hover:bg-opacity-10'
                }`}
              >
                До/После
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-3 glass-effect rounded-full font-semibold hover:bg-opacity-10 transition-all flex items-center gap-2"
              >
                <div className="icon-download text-lg"></div>
                Экспорт
              </button>
              <label className="px-6 py-3 glass-effect rounded-full font-semibold hover:bg-opacity-10 transition-all flex items-center gap-2 cursor-pointer">
                <div className="icon-upload text-lg"></div>
                Импорт
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => {
                  setEditingProject({ type: activeTab });
                  setShowForm(true);
                }}
                className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <div className="icon-plus text-lg"></div>
                Добавить
              </button>
            </div>
          </div>

          {activeTab === 'portfolio' && (projects.length === 0 ? (
            <div className="glass-effect rounded-2xl p-12 text-center">
              <p className="text-gray-400 mb-4">Нет проектов</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all"
              >
                Добавить первый проект
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="glass-effect rounded-2xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-sm text-gray-400">{project.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project, 'portfolio')}
                        className="flex-1 px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                      >
                        Редактировать
                      </button>
                      <a
                        href={project.image}
                        download={`${project.title}.jpg`}
                        className="px-4 py-2 bg-blue-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all flex items-center justify-center"
                        title="Скачать изображение"
                      >
                        <div className="icon-download text-lg"></div>
                      </a>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
                      >
                        <div className="icon-trash-2 text-lg"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {activeTab === 'beforeafter' && (beforeAfterProjects.length === 0 ? (
            <div className="glass-effect rounded-2xl p-12 text-center">
              <p className="text-gray-400">Нет проектов</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beforeAfterProjects.map((project) => (
                <div key={project.id} className="glass-effect rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-px bg-white bg-opacity-10">
                    <div className="relative h-48">
                      <img 
                        src={project.before} 
                        alt="До"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-3 py-1 bg-black bg-opacity-70 rounded-full text-xs">
                        До
                      </div>
                    </div>
                    <div className="relative h-48">
                      <img 
                        src={project.after} 
                        alt="После"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 px-3 py-1 bg-white bg-opacity-90 text-black rounded-full text-xs">
                        После
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-gray-400">{project.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project, 'beforeafter')}
                        className="flex-1 px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, 'beforeafter')}
                        className="px-4 py-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
                      >
                        <div className="icon-trash-2 text-lg"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {showForm && (
            <ProjectForm 
              project={editingProject}
              onClose={handleFormClose}
            />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminApp error:', error);
    return null;
  }
}

function ProjectForm({ project, onClose }) {
  const isBeforeAfter = project?.type === 'beforeafter';
  const [formData, setFormData] = React.useState({
    title: project?.title || '',
    category: project?.category || '',
    image: project?.image || '',
    before: project?.before || '',
    after: project?.after || '',
    description: project?.description || '',
    comment: project?.comment || '',
    tags: project?.tags?.join(', ') || ''
  });
  const [saving, setSaving] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const newProject = isBeforeAfter ? {
        id: project?.id || Date.now().toString(),
        title: formData.title,
        category: formData.category,
        before: formData.before,
        after: formData.after,
        description: formData.description
      } : {
        id: project?.id || Date.now().toString(),
        title: formData.title,
        category: formData.category,
        image: formData.image,
        description: formData.description,
        comment: formData.comment,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      if (isBeforeAfter) {
        const stored = localStorage.getItem('neurocrafts_beforeafter');
        const data = stored ? JSON.parse(stored) : { projects: [] };
        
        if (project?.id) {
          const index = data.projects.findIndex(p => p.id === project.id);
          if (index !== -1) data.projects[index] = newProject;
        } else {
          data.projects.push(newProject);
        }
        
        data.lastUpdated = new Date().toISOString();
        localStorage.setItem('neurocrafts_beforeafter', JSON.stringify(data));
      } else {
        const stored = localStorage.getItem('neurocrafts_projects');
        const data = stored ? JSON.parse(stored) : { projects: [] };
        
        if (project?.id) {
          const index = data.projects.findIndex(p => p.id === project.id);
          if (index !== -1) data.projects[index] = newProject;
        } else {
          data.projects.push(newProject);
        }
        
        data.lastUpdated = new Date().toISOString();
        localStorage.setItem('neurocrafts_projects', JSON.stringify(data));
      }

      onClose();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Не удалось сохранить проект');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
      <div className="glass-effect rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-3xl font-bold mb-6">
          {project?.id ? 'Редактировать' : 'Добавить'} {isBeforeAfter ? 'До/После' : 'проект'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Название</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Категория</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
              className="w-full bg-black border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
            >
              <option value="">Выберите категорию</option>
              {isBeforeAfter ? (
                <React.Fragment>
                  <option value="Web Design">Web Design</option>
                  <option value="Branding">Branding</option>
                  <option value="UI/UX">UI/UX</option>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <option value="AI-Дизайн">AI-Дизайн</option>
                  <option value="AI Креатив">AI Креатив</option>
                  <option value="Перенос логотипа">Перенос логотипа</option>
                  <option value="Упаковка продукта">Упаковка продукта</option>
                  <option value="Нейроразработка">Нейроразработка</option>
                  <option value="Creative Tech">Creative Tech</option>
                </React.Fragment>
              )}
            </select>
          </div>
          {isBeforeAfter ? (
            <React.Fragment>
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL изображения "До" (было говно)</label>
                <input
                  type="url"
                  value={formData.before}
                  onChange={(e) => setFormData({...formData, before: e.target.value})}
                  required
                  placeholder="https://..."
                  className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL изображения "После" (стало огонь)</label>
                <input
                  type="url"
                  value={formData.after}
                  onChange={(e) => setFormData({...formData, after: e.target.value})}
                  required
                  placeholder="https://..."
                  className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
                />
              </div>
            </React.Fragment>
          ) : (
            <div>
              <label className="block text-sm text-gray-400 mb-2">URL изображения</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
                className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows="4"
              className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50 resize-none"
            />
          </div>
          {!isBeforeAfter && (
            <React.Fragment>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Комментарий (для галереи)</label>
                <input
                  type="text"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  placeholder='Например: "Клиент хотел как у всех..."'
                  className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Теги (через запятую)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="React, UI/UX, Three.js"
                  className="w-full bg-transparent border border-white border-opacity-20 rounded-lg px-4 py-3 focus:outline-none focus:border-opacity-50"
                />
              </div>
            </React.Fragment>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white bg-opacity-10 rounded-full font-semibold hover:bg-opacity-20 transition-all"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <AdminApp />
  </ErrorBoundary>
);