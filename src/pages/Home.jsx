import { useState } from 'react';
import { useProjectData } from '../hooks/useProjectData';

import { ProjectNav } from '../components/ProjectNav';
import { DevLogList } from '../components/DevLogList';

export const Home = () => {
const { data, loading } = useProjectData();
  const [activeId, setActiveId] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (!activeId && data.length > 0) setActiveId(data[0].id);

  const activeProject = data.find(p => p.id === activeId);

  return (
    <div className="container">
      <ProjectNav 
        projects={data} 
        activeId={activeId} 
        onSelect={setActiveId} 
      />
      <DevLogList project={activeProject} />
    </div>
  );
};