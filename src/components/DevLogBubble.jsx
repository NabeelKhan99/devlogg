// src/components/DevLogBubble.jsx
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const DevLogBubble = ({ log }) => {
  // Truncate logic: Grab the first 160 characters for the feed
  const isLong = log.description.length > 160;
  const previewText = isLong 
    ? log.description.substring(0, 160).trim() + "..." 
    : log.description;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>
      <Link to={`/log/${log.id}`} className="bubble-log">
        <div className="bubble-content">
          <span className="log-date">Update</span>
          <h2 className="log-title">{log.title}</h2>
          
          {/* Use a specific class for the preview to keep it clean */}
          <p className="log-preview-text">
            {previewText}
          </p>
        </div>
        <div className="bubble-footer">
          <div className="log-actions">View Details →</div>
        </div>
      </Link>
    </motion.div>
  );
};