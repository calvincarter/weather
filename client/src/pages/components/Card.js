import './Card.css';
import Temp from './reusablecomponents/Temp';
import Precip from './reusablecomponents/Precip';
import WindData from './reusablecomponents/WindData';
import Humidity from './reusablecomponents/Humidity';
import CloudData from './reusablecomponents/CloudData';
import WeatherCondition from './reusablecomponents/WeatherCondition';

const Card = ({ weatherData, type }) => {


    
    const changeContent = () => {
        switch (type) {
            case 'temp':
                return <Temp weatherData={weatherData} />;
            case 'precipitation':
                return <Precip weatherData={weatherData} />;
            case 'winddata':
                return <WindData weatherData={weatherData} />;
            case 'humidity':
                return <Humidity weatherData={weatherData} />;
            case 'clouddata':
                return <CloudData weatherData={weatherData} />;
            case 'weathercondition':
                return <WeatherCondition weatherData={weatherData} />;
            default:
                return <div>Unknown</div>;
        }
    };

    return (
        <div className='card'>
            {changeContent()}
        </div>
    );
};

export default Card;