import { parseLogContent } from './parser';

export const loadAllData = () => {
  const files = import.meta.glob('../data/projects/*.txt', { as: 'raw', eager: true });
  
  return Object.entries(files).map(([path, content]) => {
    const fileName = path.split('/').pop().replace('.txt', '');
    
    return {
      id: fileName,
      name: fileName,
      // We pass the raw text to the parser here
      logs: parseLogContent(content, fileName)
    };
  });
};