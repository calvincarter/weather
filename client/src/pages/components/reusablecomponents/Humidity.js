import React from "react";


const Humidity = ({ weatherData, error }) => {
    

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!weatherData || !weatherData.data || !weatherData.data.values) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {weatherData &&  <h3 className="humidity-card"> Humidity: {weatherData.data.values.humidity}</h3>}
            {weatherData && <h3 className="humidity-card"> Visibility: {weatherData.data.values.visibility}</h3>}
            {weatherData &&  <h3 className="humidity-card"> Pressure Surface Level: {weatherData.data.values.pressureSurfaceLevel}</h3>}
            

                    
                   
            
      
        </div>
    );
}

export default Humidity;
