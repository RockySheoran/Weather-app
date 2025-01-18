import { useContext, createContext, useState, useEffect } from "react"
import axios from "axios"
import { VITE_API_KEY, VITE_API_KEY1 } from "../../key"

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({})
  const [values, setValues] = useState([])
  const [place, setPlace] = useState("Haryana")
  const [thisLocation, setLocation] = useState("")

  // fetch api
  //   const fetchWeather1 = async () => {
  //     const options = {
  //       method: "GET",
  //       url: "https://visual-crossing-weather.p.rapidapi.com/forecast",

  //       params: {
  //         aggregateHours: "24",
  //         location: place,
  //         contentType: "json",
  //         unitGroup: "metric",
  //         shortColumnNames: 0,
  //       },
  //       headers: {
  //         "X-RapidAPI-Key": VITE_API_KEY1,
  //         "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
  //       },
  //     }

  //     try {
  //       const response = await axios.request(options)
  //       console.log(response.data)
  //       const thisData = Object.values(response.data.locations)[0]
  //     //   setLocation(thisData.address)
  //       setValues(thisData.values)
  //     //   setWeather(thisData.values[0])
  //     } catch (e) {
  //       console.error(e)
  //       // if the api throws error.
  //       alert("This place does not exist")
  //     }
  //   }

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        q: place, // City name from the `place` state
        appid: VITE_API_KEY, // Your API key from OpenWeather
        units: "metric", // Metric units for temperature (Celsius)
      },
    }
    try {
      const response = await axios.request(options)
    //   console.log(response.data)

      var lat = response.data.coord.lat
      var lon = response.data.coord.lon
      daily(lat, lon)
      // Extract relevant data from OpenWeather API response
      const thisData = response.data
      const location = `${thisData.name}, ${thisData.sys.country}`
      const weatherDetails = {
        temp: thisData.main.temp,
        feels_like: thisData.main.feels_like,
        description: thisData.weather[0].description,
        humidity: thisData.main.humidity,
        wind_speed: thisData.wind.speed,
        icon:thisData.weather[0].icon
      }

      setLocation(location) // Set location as "City, Country"
      setWeather(weatherDetails) // Store extracted weather data
      // Set values array (single object)
    } catch (e) {
      console.error("Error fetching weather data:", e)
      alert(
        "Unable to fetch weather data. Please check the city name or try again later."
      )
    }
  }

  const daily = async (lat, lon) => {
    try {
      const forecastDays = 7

      // Step 2: Fetch 7-day weather data using the One Call API
      const oneCallUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${VITE_API_KEY1}`

    //   console.log(oneCallUrl)
      const userdata = await axios.get(oneCallUrl)
      console.log(userdata)
    //   let loc = userdata.data[0].name
    //   console.log(loc)
      //By using City name  we can get the weather details of that particular city from OpenWeatherMap API
      let url = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&`
      let respond = await axios.get(
        url + `q=${place}&` + `appid=${VITE_API_KEY1}`
      )
        //  console.log(respond.data.list)
      const newValue = respond?.data?.list?.filter((item, index) => {
        return index % 8 == 0 && item
      })
    //   console.log(newValue)
      //  const dailyForecasts = weatherResponse.data.daily

      // Step 3: Set the state with the daily forecast
      setValues(newValue)
    } catch (error) {
      console.log("Error fetching weather data:", error)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [place])

  useEffect(() => {
    //   fetchWeather1();
  }, [place])
  console.log(weather)
  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
