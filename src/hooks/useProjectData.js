import { useState, useEffect } from 'react';
import { loadAllData } from '../utils/loader';

export const useProjectData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = loadAllData();
    setData(loaded);
    setLoading(false);
  }, []);

  return { data, loading };
};