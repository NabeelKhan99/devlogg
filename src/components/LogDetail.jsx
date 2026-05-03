// src/pages/LogDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useProjectData } from '../hooks/useProjectData';

export const LogDetail = () => {
  const { id } = useParams();
  const { data, loading } = useProjectData();

  if (loading) return <div className="loading-state">Loading details...</div>;

  const allLogs = data.flatMap(p => p.logs);
  const log = allLogs.find((l) => l.id === id);

  if (!log) return <div className="error-state">Log not found.</div>;

  return (
    <div className="log-detail-page">
      <div className="detail-container">
        <Link to="/" className="back-btn">← Back to Feed</Link>
        
        <header className="detail-header">
          <h1 className="detail-title">{log.title}</h1>
        </header>

        {/* Use a div with 'white-space' support instead of a simple <p> */}
        <div className="detail-content">
          {log.description}
        </div>

        {log.image && (
          <div className="detail-media-wrapper">
            <img src={log.image} alt="Log visual" className="log-media" />
          </div>
        )}
      </div>
    </div>
  );
};