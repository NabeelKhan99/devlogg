export const ProjectNav = ({ projects, activeId, onSelect }) => {
  return (
    <nav className="project-nav">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project.id)}
          className={`nav-btn ${activeId === project.id ? 'active' : ''}`}
        >
          {project.name.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};