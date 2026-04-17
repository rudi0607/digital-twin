import { useEffect, useState } from 'react';
import { api } from '../api/client';

export const useQuakeData = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eqRes, alertRes, predRes] = await Promise.all([
        api.get('/earthquakes'),
        api.get('/alerts?threshold=4.5'),
        api.get('/prediction')
      ]);

      setEarthquakes(eqRes.data.earthquakes || []);
      setAlerts(alertRes.data.alerts || []);
      setPrediction(predRes.data || null);
      setError('');
    } catch (fetchError) {
      setError(fetchError?.response?.data?.message || 'Failed to fetch live data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 60_000);
    return () => clearInterval(timer);
  }, []);

  return { earthquakes, alerts, prediction, loading, error, refetch: fetchData };
};
