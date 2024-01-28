import React from "react";


const WeatherAlert = ({chosenLocation}) => {

    let alert= '';
    if (chosenLocation && chosenLocation.alert) {
        alert = chosenLocation.alert;
    }

    return (
        <div>
            {alert && <h3>Weather alert - {chosenLocation.alert}</h3>}
        </div>
    )

}

export default WeatherAlert;

