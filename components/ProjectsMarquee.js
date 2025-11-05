const ProjectsMarquee = React.memo(function ProjectsMarquee() {
  const [projects, setProjects] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const fallbackProjects = [
        {
          id: "fallback-1",
          title: "AI Портрет",
          category: "AI-Дизайн",
          image: "https://i.imgur.com/AOgdJ1e.jpeg",
          showInMarquee: true
        },
        {
          id: "fallback-2",
          title: "Перенос Логотипа",
          category: "Перенос логотипа",
          image: "https://i.imgur.com/QZXwOla.jpeg",
          showInMarquee: true
        },
        {
          id: "fallback-3",
          title: "Упаковка Продукта",
          category: "Упаковка продукта",
          image: "https://i.imgur.com/EAJNa7U.jpeg",
          showInMarquee: true
        }
      ];

      let stored;
      try {
        stored = localStorage.getItem('neurocrafts_projects');
      } catch (e) {
        console.warn('LocalStorage not available');
        stored = null;
      }

      if (stored) {
        try {
          const data = JSON.parse(stored);
          const marqueeProjects = (data.projects || []).filter(p => {
            if (!p.showInMarquee) return false;
            const img = p.image || '';
            return !img.includes('.mp4') && !img.includes('.webm') && !img.includes('video');
          });
          console.log('✅ Loaded from localStorage:', marqueeProjects.length, 'projects');
          if (marqueeProjects.length > 0) {
            setProjects(marqueeProjects);
            return;
          }
        } catch (parseError) {
          console.warn('Failed to parse stored data');
        }
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('data/projects.json', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          const marqueeProjects = (data.projects || []).filter(p => {
            if (!p.showInMarquee) return false;
            const img = p.image || '';
            return !img.includes('.mp4') && !img.includes('.webm') && !img.includes('video');
          });
          console.log('✅ Loaded from file:', marqueeProjects.length, 'projects');
          
          if (marqueeProjects.length > 0) {
            setProjects(marqueeProjects);
            try {
              localStorage.setItem('neurocrafts_projects', JSON.stringify(data));
            } catch (storageError) {
              console.warn('Cannot save to localStorage');
            }
            return;
          }
        }
      } catch (fetchError) {
        console.log('⚠️ Fetch error, using fallback');
      }

      console.log('📦 Using fallback projects:', fallbackProjects.length);
      setProjects(fallbackProjects);
    } catch (error) {
      console.error('❌ ProjectsMarquee error:', error);
      setProjects([]);
    }
  };

  if (projects.length === 0) return null;

  const tripleProjects = [...projects, ...projects, ...projects];

  return (
    <>
      <section 
        className="py-0 overflow-hidden border-y-4 border-white bg-black"
        data-name="projects-marquee"
        data-file="components/ProjectsMarquee.js"
      >
        <div 
          className="flex"
          style={{
            animation: `marquee 20s linear infinite ${isPaused ? 'paused' : 'running'}`,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {tripleProjects.map((project, index) => (
            <div 
              key={`project-${index}`}
              className="flex-shrink-0 relative cursor-pointer group"
              onClick={() => setSelectedProject({ project, index: index % projects.length })}
            >
              <div className="relative w-[200px] md:w-[240px] h-[140px] md:h-[160px] overflow-hidden border-r-4 border-white bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-black text-xl uppercase tracking-tight mb-1">{project.title}</h3>
                    <p className="text-[#FFD600] text-base font-bold">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject.project}
          currentIndex={selectedProject.index}
          totalProjects={projects.length}
          allProjects={projects}
          onNavigate={(direction, targetIndex) => {
            const newIndex = typeof targetIndex === 'number' ? targetIndex :
              direction === 'next' ? (selectedProject.index + 1) % projects.length :
              (selectedProject.index - 1 + projects.length) % projects.length;
            setSelectedProject({ project: projects[newIndex], index: newIndex });
          }}
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </>
  );
});