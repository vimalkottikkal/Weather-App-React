
const CurrentWeatherSection = ({currentWeather}) => {
  return (
    <div className="current-weather" >
      <img className="weather-icon" src={`icons/${currentWeather.weatherIcon}.svg`} alt="weather" />
      <h2 className="temperature">{currentWeather.temperature} <span>°C</span></h2>
      <p className="description">{currentWeather.description}</p>
 
    </div>
  );
};

export default CurrentWeatherSection;
