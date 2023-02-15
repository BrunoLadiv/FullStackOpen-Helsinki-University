import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Weather({ capital }) {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  // console.log(api_key)
  // console.log(capital[0])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&units=metric&APPID=${api_key}`
      )
      .then((res) => setWeather(res.data))
  }, [capital, api_key])
  return (
    weather && (
      <div className="weather">
        <h2>Weather in {capital}:</h2>
        <p>Temperature: {weather.main.temp.toFixed(0)}°C </p>
        <p>Humidity: {weather.main.humidity}% </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
      </div>
    )
  )
}
