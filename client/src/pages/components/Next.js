import React from "react";
import ImplementForecastData from "./ImplementForecastData";

const Next = () => {
  const { hourlyForecast, dailyForecast, error, loading } =
    ImplementForecastData("new york");

  // Check if there is an error first
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if the data is still being loaded
  if (loading) {
    return <div>Loading forecast data...</div>;
  }

  // Extract the first 5 days of daily forecast and the first 12 hours of hourly forecast
  const fiveDayForecast = Array.isArray(dailyForecast)
    ? dailyForecast.slice(0, 5)
    : [];
  const twelveHourForecast = Array.isArray(hourlyForecast)
    ? hourlyForecast.slice(0, 12)
    : [];

  // setting correct hours and days for forecast feature
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours(); // get hours in 24-hour format
    let minutes = date.getUTCMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const getDayOfMonth = (isoString) => {
    const date = new Date(isoString);
    return date.getUTCDate(); // returns the day of the month (1-31) for the specified date according to universal time.
  };

  return (
    <div className="forecast-container">
      <h1 className="future-forecast-title">Future Forecast</h1>
      <div className="main-div">


        <div className="next-5-d">
          <h2>Next 5 Days</h2>
          <ul>
            {fiveDayForecast.map((forecast, index) => (
              <li key={index}>
                 {getDayOfMonth(forecast.startTime)}:{" "}
                {forecast.values.temperature}°C
              </li>
            ))}
          </ul>
        </div>


        <div className="next-12-h">
          <h2>Next 12 Hours</h2>
          <ul>
            {twelveHourForecast.map((forecast, index) => (
              <li key={index}>
                 {formatTime(forecast.startTime)}:{" "}
                {forecast.values.temperature}°C
              </li>
            ))}
          </ul>
        </div>

        
      </div>
    </div>
  );
};

export default Next;
