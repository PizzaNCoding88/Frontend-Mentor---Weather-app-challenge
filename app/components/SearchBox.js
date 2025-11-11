"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [textLocation, setTextLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTextLocation(query);
    setQuery("");
    const { latitude, longitude } = await getCoordinates(query);
    const weatherData = await getWeather(latitude, longitude);
    setWeather(weatherData);
    console.log(weatherData);
  };

  async function getCoordinates(location) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=1&language=en&format=json`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Geocoding API failed: ${res.status}`);
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Location not found");
    }

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    return { latitude, longitude };
  }

  async function getWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&timezone=auto`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Weather API failed: ${res.status}`);
    }

    const data = await res.json();
    return data;
  }

  return (
    <div className="flex flex-col gap-4 font-dmsans">
      <form
        className="flex items-center bg-grey  rounded-md 
                 px-3 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-blue-500"
      >
        <Search className="text-gray-400 ml-1" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="flex-1 bg-transparent outline-none pl-2 text-gray-400 placeholder:text-gray-400"
        />
      </form>
      <button
        className="bg-purple rounded-md px-3 py-2 w-full"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
