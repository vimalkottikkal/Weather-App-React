import SearchSection from './components/SearchSection'
import CurrentWeatherSection from './components/CurrentWeatherSection'
import HourlyWeatherItem from './components/HourlyWeatherItem'
import './index.css';
import { useState } from 'react';
import { weatherCodes } from './constant';


const App = () => {

  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0,0,0);
    const next24Hours = currentHour + 24*60*60*1000;

    //Filter the hourly data to only include next 24 hours
    const next24HoursData = hourlyData.filter(({time})=>{
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours
    })
    setHourlyForecasts(next24HoursData);
    
  }

  //fetches weather details based on the API URL
  const  getWeatherDetails = async (API_URL) =>{
    try{
      const response = await fetch(API_URL);
      const data = await response.json()
      
      //Extract current weather data
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));
   
      console.log(data);
      
      setCurrentWeather({temperature,description,weatherIcon});

      //combine hourly data from both days
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]

      filterHourlyForecast(combinedHourlyData)
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="container">

      {/* Search Section */}
     <SearchSection getWeatherDetails={getWeatherDetails} />

      {/* Current Weather */}
      <div className="weather-section">
      <CurrentWeatherSection currentWeather = {currentWeather} />
      
      
        {/* Hourly Weather forecast */}
        <div className="hourly-forecast">
          <ul className='weather-list'>
            {hourlyForecasts.map((hourlyWeather)=> (
              <HourlyWeatherItem key={hourlyWeather.time_epoch} hourlyWeather ={hourlyWeather} /> 
            ))}
          
          </ul>
          
        </div>
      </div>
      </div>
  )
}

export default App
