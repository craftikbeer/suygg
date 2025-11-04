// Custom hook for loading projects with fallback
function useProjects(storageKey, dataPath, fallbackData) {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = React.useCallback(async () => {
    try {
      let stored;
      try {
        stored = localStorage.getItem(storageKey);
      } catch (e) {
        stored = null;
      }

      if (stored) {
        try {
          const data = JSON.parse(stored);
          setProjects(data.projects || []);
          setLoading(false);
          return;
        } catch (e) {
          console.warn('Parse error');
        }
      }

      setProjects(fallbackData);
      setLoading(false);

      try {
        const response = await fetch(dataPath);
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || fallbackData);
          try {
            localStorage.setItem(storageKey, JSON.stringify(data));
          } catch (e) {
            console.warn('Cannot save');
          }
        }
      } catch (e) {
        console.log('Using fallback');
      }
    } catch (err) {
      setError(err);
      setProjects([]);
      setLoading(false);
    }
  }, [storageKey, dataPath, fallbackData]);

  return { projects, loading, error, reload: loadProjects };
}