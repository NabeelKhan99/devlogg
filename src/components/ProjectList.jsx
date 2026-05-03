import { motion } from 'motion/react';

export const ProjectList = ({ projects, activeId, onSelect }) => (
  <nav className="project-tabs">
    {projects.map((p) => (
      <motion.button 
        key={p.id}
        className={activeId === p.id ? 'active' : ''}
        onClick={() => onSelect(p.id)}
        whileHover={{ scale: 1.05 }}
      >
        {p.name}
      </motion.button>
    ))}
  </nav>
);