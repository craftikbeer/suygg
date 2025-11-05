function ProjectModal({ project, currentIndex, totalProjects, onNavigate, onClose, allProjects }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => setIsLoaded(true), 50);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
      onClick={handleBackdropClick}
      data-name="project-modal"
      data-file="components/ProjectModal.js"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.4s ease-out'
      }}
    >
      <div 
        className="relative max-w-4xl w-full my-8"
        style={{
          transform: isLoaded ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border-4 border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]">
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/5 to-transparent"></div>
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-500 font-mono">ACTIVE</span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-all group border border-red-500/30"
          >
            <div className="icon-x text-lg md:text-xl text-red-400 group-hover:rotate-90 transition-transform"></div>
          </button>
          
          <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
            <span className="text-sm font-bold">{currentIndex + 1} / {totalProjects}</span>
          </div>
          
          {totalProjects > 1 && (
            <>
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 group"
              >
                <div className="icon-chevron-left text-2xl text-white group-hover:-translate-x-1 transition-transform"></div>
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 group"
              >
                <div className="icon-chevron-right text-2xl text-white group-hover:translate-x-1 transition-transform"></div>
              </button>
            </>
          )}

          <div className="relative mt-12 md:mt-16 mb-6 md:mb-8 px-4 md:px-8">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-[inset_0_0_60px_rgba(255,255,255,0.03)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full h-auto max-h-[45vh] object-contain"
              />
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 4px)',
                animation: 'scan 8s linear infinite'
              }}></div>
            </div>
          </div>

          <div className="px-6 md:px-12 pb-8 md:pb-12">
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 bg-white text-black text-sm md:text-base font-black tracking-wider uppercase">{project.category}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              {project.title}
            </h2>
            {project.comment && (
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-black mb-4 md:mb-6 leading-relaxed italic">
                "{project.comment}"
              </p>
            )}
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-transparent text-white border-2 border-white text-xs md:text-sm font-bold uppercase hover:bg-white hover:text-black transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-gray-800/50 to-transparent rounded-b-3xl blur-xl"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}