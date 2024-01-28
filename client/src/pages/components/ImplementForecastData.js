import { useState, useEffect } from "react";

const ImplementForecastData = (location) => {
  const [forecastData, setForecastData] = useState({ hourly: [], daily: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;

    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/forecast?location=${encodeURIComponent(location)}`);
        if (!response.ok) {
          throw new Error('API call failed with status: ' + response.status);
        }
        const data = await response.json();
        setForecastData({ hourly: data.hourly, daily: data.daily });
      } catch (error) {
        setError(error.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [location]);

  return {
    hourlyForecast: forecastData.hourly,
    dailyForecast: forecastData.daily,
    error,
    loading
  };
};

export default ImplementForecastData;
