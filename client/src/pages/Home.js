import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./Home.css";
import Navbar from "./components/Navbar";
import WeatherAlert from "./components/reusablecomponents/WeatherAlert";
import ImplementWeatherData from "./components/ImplementWeatherData";
import Next from "./components/Next";

const Home = () => {
  const [chosenLocation, setChosenLocation] = useState(localStorage.getItem("userLocation") || "new york"); // State to hold the current location

  // Check for a saved location in local storage when the component mounts
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    console.log("Retrieved location from storage:", savedLocation);
    if (savedLocation) {
      setChosenLocation(savedLocation); // Update location state if found in storage
    }
  }, []);

  // Function to handle city change from the Navbar
  const handleCityChange = (newCity) => {
    setChosenLocation(newCity); // Update the chosen location with the new city
    localStorage.setItem("userLocation", newCity);
  };


  // Retrieve weather data using the ImplementWeatherData hook
  const { weatherData, error } = ImplementWeatherData(chosenLocation);

  // Display an error message if there is an error fetching the data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If data is still loading, display a loading message
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-content-home">
        <Navbar onCitySubmit={handleCityChange} />
        <WeatherAlert chosenLocation={chosenLocation} />
        <h1 className="cityname-display">{chosenLocation}</h1>
        <section className="weather-cards">
          {/* Pass the fetched weatherData to each Card */}
          <Card id="1" type="temp" weatherData={weatherData} />
          <Card id="2" type="precipitation" weatherData={weatherData} />
          <Card id="3" type="winddata" weatherData={weatherData} />
          <Card id="4" type="humidity" weatherData={weatherData} />
          <Card id="5" type="clouddata" weatherData={weatherData} />
          <Card id="6" type="weathercondition" weatherData={weatherData} />
        </section>
        <hr className="divider" />
        <section className="future-forecast">
          
          <br/>
          <Next />

        </section>
        
      </div>
    </>
  );
};

export default Home;
