const SearchSection = ({getWeatherDetails}) => {
const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCitySearch = (e)=> {
    e.preventDefault();
    const searchInput = e.target.querySelector(".search-input")
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
    getWeatherDetails(API_URL);
    
  }
  return (
    <div className="search-section">
    <form action='#' className="search-form" onSubmit={handleCitySearch}>
      <span className="material-symbols-rounded">search</span>
      <input type="search" placeholder="Enter a city Name" className="search-input" required/>
    </form>
  </div>
  )
}

export default SearchSection