// src/components/DevLogList.jsx
import { AnimatePresence } from 'motion/react';
import { DevLogBubble } from './DevLogBubble';

export const DevLogList = ({ project }) => {
  // If no project is selected or project has no logs
  if (!project) return <div className="no-logs">Select a project.</div>;

  return (
    <main className="log-feed">
      <AnimatePresence mode="wait">
        {project.logs.map((log) => (
          <DevLogBubble key={log.id} log={log} />
        ))}
      </AnimatePresence>
    </main>
  );
};