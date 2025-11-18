"use client";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import WeatherIcon from "../components/WeatherCodeMapping/WeatherIcon";
import { ChevronDown } from "lucide-react";
import { Settings } from "lucide-react";
import { Sun } from "lucide-react";

const MainPage = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");

  const handleWeatherData = ({ place, country, weather }) => {
    setWeather(weather);
    setLocation(place);
    setCountry(country);
    console.log(weather, location, country);
  };

  return (
    <div className="mx-8 font-bricolage pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun color="orange" size={25} />
          <h2 className="">Weather Now</h2>
        </div>
        <div className="bg-grey px-3 py-1 flex items-center gap-1">
          <Settings color="white" size={14} strokeWidth={2} />
          <p className="text-sm">Units</p>
          <ChevronDown color="white" size={14} strokeWidth={3} />
        </div>
      </div>
      <div className="text-center py-12">
        <h1 className="text-5xl font-semibold">
          How&apos;s the sky looking today?
        </h1>
      </div>
      <div>
        <SearchBox onWeatherFetched={handleWeatherData} />
      </div>
      <div className="text-center bg-purple mt-8 rounded-3xl p-8 flex flex-col gap-3 bg-[url('../public/assets/images/bg-today-small.svg')] bg-cover py-14">
        <p className="font-bold text-xl">
          {location}, {country}
        </p>
        <p className="font-extralight text-sm">
          {weather.current?.time
            ? new Date(weather.current.time).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : ""}
        </p>
        {weather.current && (
          <div className="flex justify-between px-10 items-center">
            {weather.current && (
              <WeatherIcon weatherCode={weather.current.weather_code} />
            )}
            <p className="text-7xl font-semibold">
              {Math.trunc(weather.current.temperature_2m)}&deg;
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 py-6 font-dmsans">
        <div className="flex flex-col gap-2 py-8 px-6 bg-grey rounded-2xl ">
          <p className="text-md font-extralight">Feels Like</p>
          <p className="text-2xl">
            {Math.round(weather.current.apparent_temperature)}&deg;
          </p>
        </div>
        <div className="flex flex-col gap-2 py-8 px-6 bg-grey rounded-2xl ">
          <p className="text-md font-extralight">Humidity</p>
          <p className="text-2xl">{weather.current.relative_humidity_2m}%</p>
        </div>
        <div className="flex flex-col gap-2 py-8 px-6 bg-grey rounded-2xl ">
          <p className="text-md font-extralight">Wind</p>
          <p className="text-2xl">
            {weather.current.wind_speed_10m}
            {weather.current_units.wind_speed_10m}
          </p>
        </div>
        <div className="flex flex-col gap-2 py-8 px-6 bg-grey rounded-2xl ">
          <p className="text-md font-extralight">Precipitation</p>
          <p className="text-2xl">
            {weather.current.precipitation}
            {weather.current_units.precipitation}
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-dmsans">Daily Forecast</h2>
        <div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
