/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  icon
}) => {

  // const [icon, setIcon] = useState(sun)
  // // const { time } = useDate()

  // useEffect(() => {
  //   if (iconString) {
  //     if (iconString.toLowerCase().includes('cloud')) {
  //       setIcon(cloud)
  //     } else if (iconString.toLowerCase().includes('rain')) {
  //       setIcon(rain)
  //     } else if (iconString.toLowerCase().includes('clear')) {
  //       setIcon(sun)
  //     } else if (iconString.toLowerCase().includes('thunder')) {
  //       setIcon(storm)
  //     } else if (iconString.toLowerCase().includes('fog')) {
  //       setIcon(fog)
  //     } else if (iconString.toLowerCase().includes('snow')) {
  //       setIcon(snow)
  //     } else if (iconString.toLowerCase().includes('wind')) {
  //       setIcon(wind)
  //     }
  //   }
    
  // }, [iconString])
  const [today, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    },  1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  const locale = "en"
      const time = today.toLocaleDateString(locale, {
        hour: "numeric",
        hour12: true,
        minute: "numeric",
      })
  

  return (
    <div className='w-[22rem]  min-w-[300px] h-[30rem] glassCard sm:p-4 py-2 px-2' >
      <div className='flex w-full just-center, items-center gap-4 sm:mt-12 mt-5 mb-4'>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather_icon" />
        <p className='font-bold text-4xl sm:text-5xl flex justify-center items-center' >{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{windspeed} km/h</p></p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard