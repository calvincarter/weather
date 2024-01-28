import React from "react";



const WeatherCondition = ({weatherData, error}) => {
    
    if (error) {
        return <div>Error: {error}</div>
    }

    if (!weatherData || !weatherData.data || !weatherData.data.values) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            {weatherData && <h3 className="weathercondition-card"> Condition: {weatherData.data.values.weatherCode}</h3>}
            
        </div>
    )
}

export default WeatherCondition;



