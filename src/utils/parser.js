// src/utils/parser.js

export const parseLogContent = (content, projectId) => {
  // 1. Split by "Day X :" to get each log block
  const entries = content.split(/(?=Day \d+\s*[:])/gi).filter(Boolean);
  
  return entries.map((entry, index) => {
    const lines = entry.trim().split(/\r?\n/);
    const title = lines[0]?.trim() || `Log ${index + 1}`;
    
    // 2. Find where the description starts
    const descStartIndex = lines.findIndex(line => line.toLowerCase().includes('desc ::'));

    let finalDescription = "";
    let image = null;
    let video = null;

    if (descStartIndex !== -1) {
      // 3. Grab everything from the line AFTER "Desc ::" to the end of the block
      const descLines = lines.slice(descStartIndex);
      
      // Join them back into a single string so we can search for media and clean tags
      const fullDescText = descLines.join('\n');
      
      // Remove the "Desc ::" label itself
      const contentOnly = fullDescText.replace(/desc\s*::/i, '').trim();

      // 4. Extract Media Tags
      const imgMatch = contentOnly.match(/\[img:(.*?)\]/i);
      const vidMatch = contentOnly.match(/\[vid:(.*?)\]/i);
      image = imgMatch ? imgMatch[1] : null;
      video = vidMatch ? vidMatch[1] : null;

      // 5. Clean the text (remove the media tags from the visible text)
      finalDescription = contentOnly.replace(/\[(img|vid):.*?\]/gi, '').trim();
    }

    return {
      id: `${projectId}-${index}`,
      title: title,
      description: finalDescription, // This now contains all your bullet points!
      image: image,
      video: video
    };
  });
};