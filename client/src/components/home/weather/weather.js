import ReactWeather, { useOpenWeather } from "react-open-weather"
import "./weather.css"
require("dotenv").config()

const Weather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_WEATHER_KEY,
    lat: "31.2530",
    lon: "34.7915",
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  })

  return <ReactWeather isLoading={isLoading} errorMessage={errorMessage} data={data} lang='en' locationLabel='Beersheba, Israel' unitsLabels={{ temperature: "C", windSpeed: "Km/h" }} showForecast />
}

export default Weather
