function Gallery() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState('ВСЁ');
  const [searchTag, setSearchTag] = React.useState('');

  React.useEffect(() => {
    loadProjectsFromFile();
  }, []);

  React.useEffect(() => {
    let filtered = projects;
    
    if (activeFilter !== 'ВСЁ') {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
    
    if (searchTag.trim()) {
      filtered = filtered.filter(p => 
        p.tags && p.tags.some(tag => 
          tag.toLowerCase().includes(searchTag.toLowerCase())
        )
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeFilter, searchTag, projects]);

  const loadProjectsFromFile = async () => {
    try {
      let stored;
      try {
        stored = localStorage.getItem('neurocrafts_projects');
      } catch (storageError) {
        console.warn('LocalStorage not available');
        stored = null;
      }
      
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setProjects(data.projects || []);
          setFilteredProjects(data.projects || []);
          return;
        } catch (parseError) {
          console.warn('Failed to parse stored data');
        }
      }
      
      const fallbackProjects = [
        {
          id: "1",
          title: "AI Портрет",
          category: "AI-Дизайн",
          image: "https://i.imgur.com/E040DG1.jpeg",
          description: "Создание реалистичного AI портрета с использованием нейросетей",
          comment: "Клиент хотел \"как у всех\". Мы сделали наоборот — и конверсия выросла на 180%.",
          tags: ["AI", "Портрет", "Нейросеть"]
        },
        {
          id: "2",
          title: "Редизайн Логотипа",
          category: "Нейроразработка",
          image: "https://i.imgur.com/UHhDTAb.jpeg",
          description: "Модернизация корпоративного логотипа с сохранением узнаваемости",
          comment: "Редизайн, который изменил восприятие бренда за 2 недели.",
          tags: ["Логотип", "Редизайн", "Брендинг"]
        },
        {
          id: "3",
          title: "Фирменный стиль",
          category: "Creative Tech",
          image: "https://i.imgur.com/Ia2nNxO.jpeg",
          description: "Разработка визуальной системы, которая говорит без слов.",
          comment: "Клиент инвестировал втрое больше изначального бюджета. Результат того стоил.",
          tags: ["Логотип", "Концепт", "Редизайн", "Брендинг", "Премиум", "Фирменный стиль"]
        }
      ];
      
      setProjects(fallbackProjects);
      setFilteredProjects(fallbackProjects);
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('data/projects.json', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          const projectsData = data.projects || fallbackProjects;
          setProjects(projectsData);
          setFilteredProjects(projectsData);
          try {
            localStorage.setItem('neurocrafts_projects', JSON.stringify(data));
          } catch (storageError) {
            console.warn('Cannot save to localStorage');
          }
        }
      } catch (fetchError) {
        console.log('Using fallback projects');
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
      setFilteredProjects([]);
    }
  };

  const handleProjectClick = (project, index) => {
    setSelectedProject({ project, index });
  };

  const handleNavigate = (direction, targetIndex) => {
    if (!selectedProject) return;
    
    let newIndex;
    if (typeof targetIndex === 'number') {
      newIndex = targetIndex;
    } else {
      newIndex = direction === 'next' 
        ? (selectedProject.index + 1) % filteredProjects.length
        : (selectedProject.index - 1 + filteredProjects.length) % filteredProjects.length;
    }
    
    setSelectedProject({ 
      project: filteredProjects[newIndex], 
      index: newIndex 
    });
  };

  return (
    <>
    <section id="gallery" className="min-h-screen py-20 md:py-32 px-4 md:px-8 lg:px-16" data-name="gallery" data-file="components/Gallery.js">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-10 text-center leading-none px-4">
          МОИ РАБОТЫ
        </h2>
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 border-t-4 border-b-4 border-white py-4 md:py-5">
          <p className="text-base md:text-lg lg:text-xl text-center font-black px-4">
            РЕАЛЬНЫЕ ПРОЕКТЫ • РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ
          </p>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ПОИСК ПО ТЕГАМ..."
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="w-full px-6 py-4 bg-transparent border-2 border-white/30 focus:border-white focus:outline-none text-center font-bold uppercase tracking-wide placeholder-gray-500"
            />
            {searchTag && (
              <button
                onClick={() => setSearchTag('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-black hover:bg-gray-200 flex items-center justify-center transition-all"
              >
                <div className="icon-x text-sm font-black"></div>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-20">
          {['ВСЁ', 'AI-Дизайн', 'AI Креатив', 'Перенос логотипа', 'Упаковка продукта', 'Нейроразработка', 'Creative Tech'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 md:px-8 py-3 md:py-4 font-black text-sm md:text-base uppercase tracking-wide transition-all transform hover:scale-105 border-2 ${
                activeFilter === filter
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-bold">ПРОЕКТОВ НЕ НАЙДЕНО</p>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredProjects.map((project, index) => (
            <div 
              key={index}
              onClick={() => handleProjectClick(project, index)}
              className="relative border-b border-white/10 cursor-pointer group hover:bg-white/5 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-2 p-6 md:p-8 flex items-center justify-center bg-black">
                  <span className="text-5xl md:text-6xl lg:text-8xl font-black text-white text-opacity-10">0{index + 1}</span>
                </div>
                
                <div className="lg:col-span-4 relative overflow-hidden" style={{ height: '350px', minHeight: '350px' }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white text-black text-xs font-black uppercase">
                    {project.category}
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-r from-black to-transparent">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 uppercase tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl text-gray-300 font-black mb-4 md:mb-6 leading-relaxed italic">
                    "{project.comment}"
                  </p>
                  <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black uppercase text-white transition-colors">
                      СМОТРЕТЬ ПРОЕКТ
                    </span>
                    <div className="icon-arrow-right text-lg text-white group-hover:translate-x-2 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </section>
    {selectedProject && (
      <ProjectModal 
        project={selectedProject.project}
        currentIndex={selectedProject.index}
        totalProjects={filteredProjects.length}
        allProjects={filteredProjects}
        onNavigate={handleNavigate}
        onClose={() => setSelectedProject(null)} 
      />
    )}
    </>
  );
}