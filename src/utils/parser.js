// src/utils/parser.js
export const parseLogContent = (content, projectId) => {
  let rawText = content;

  // Handle Vite's Base64 encoding for production builds on Netlify
  if (typeof content === 'string' && content.startsWith('data:text/plain;base64,')) {
    try {
      rawText = atob(content.split(',')[1]);
    } catch (e) {
      console.error("Decoding failed", e);
    }
  }

  if (!rawText || typeof rawText !== 'string') return [];

  // 1. Split the entire file into "Day" blocks first
  // This ensures Day 1 and Day 2 are treated as separate containers
  const dayChunks = rawText.split(/(?=Day \d+\s*[:])/gi).filter(Boolean);
  
  return dayChunks.map((chunk, index) => {
    const lines = chunk.trim().split(/\r?\n/);
    
    // The first line of the chunk is always your title
    const title = lines[0]?.trim() || `Log ${index + 1}`;
    
    // 2. GREEDY CAPTURE: Find 'Desc ::' and grab EVERYTHING after it in this chunk
    // This regex works even if the description is on the same line as 'Desc ::'
    const descRegex = /desc\s*::([\s\S]*)/i;
    const match = chunk.match(descRegex);

    let finalDescription = "";
    let image = null;
    let video = null;

    if (match && match[1]) {
      // match[1] contains everything from the '::' to the end of this day's chunk
      const contentOnly = match[1].trim();

      // Extract Media Tags
      const imgMatch = contentOnly.match(/\[img:(.*?)\]/i);
      const vidMatch = contentOnly.match(/\[vid:(.*?)\]/i);
      image = imgMatch ? imgMatch[1] : null;
      video = vidMatch ? vidMatch[1] : null;

      // Clean up the text by removing the media tags
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