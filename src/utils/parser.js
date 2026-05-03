// src/utils/parser.js

export const parseLogContent = (content, projectId) => {
  // FIX: If 'content' is a Vite module object, get the string from .default
  const rawText = typeof content === 'string' ? content : content.default || "";

  if (!rawText || typeof rawText !== 'string') {
    console.error(`Parser received invalid content for ${projectId}:`, content);
    return [];
  }

  // Now .split() will definitely work because rawText is a string
  const entries = rawText.split(/(?=Day \d+\s*[:])/gi).filter(Boolean);
  
  return entries.map((entry, index) => {
    const lines = entry.trim().split(/\r?\n/);
    const title = lines[0]?.trim() || `Log ${index + 1}`;
    
    const descStartIndex = lines.findIndex(line => line.toLowerCase().includes('desc ::'));

    let finalDescription = "";
    let image = null;
    let video = null;

    if (descStartIndex !== -1) {
      const descLines = lines.slice(descStartIndex);
      const fullDescText = descLines.join('\n');
      const contentOnly = fullDescText.replace(/desc\s*::/i, '').trim();

      const imgMatch = contentOnly.match(/\[img:(.*?)\]/i);
      const vidMatch = contentOnly.match(/\[vid:(.*?)\]/i);
      image = imgMatch ? imgMatch[1] : null;
      video = vidMatch ? vidMatch[1] : null;

      finalDescription = contentOnly.replace(/\[(img|vid):.*?\]/gi, '').trim();
    }

    return {
      id: `${projectId}-${index}`,
      title: title,
      description: finalDescription,
      image: image,
      video: video
    };
  });
};