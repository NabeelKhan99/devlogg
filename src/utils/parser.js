// src/utils/parser.js
export const parseLogContent = (content, projectId) => {
  let rawText = content;

  // If Vite encoded it as a Data URI, we must decode it
  if (typeof content === 'string' && content.startsWith('data:text/plain;base64,')) {
    try {
      // atob() decodes base64 strings
      rawText = atob(content.split(',')[1]);
    } catch (e) {
      console.error("Decoding failed", e);
    }
  }

  // Ensure we have a valid string before splitting
  if (!rawText || typeof rawText !== 'string') return [];

  const entries = rawText.split(/(?=Day \d+\s*[:])/gi).filter(Boolean);
  
  return entries.map((entry, index) => {
    const lines = entry.trim().split(/\r?\n/);
    // ... rest of your existing mapping logic
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