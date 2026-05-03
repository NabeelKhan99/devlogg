import { parseLogContent } from './parser';

export const loadAllData = () => {
  // Use query: '?raw' for better production compatibility
  const files = import.meta.glob('../data/projects/*.txt', { 
    query: '?raw', 
    eager: true 
  });
  
  return Object.entries(files).map(([path, content]) => {
    const fileName = path.split('/').pop().replace('.txt', '');
    
    // Check if the content is wrapped in a module object (common in prod)
    const rawContent = typeof content === 'string' ? content : (content.default || "");
    
    return {
      id: fileName,
      name: fileName,
      logs: parseLogContent(rawContent, fileName)
    };
  });
};