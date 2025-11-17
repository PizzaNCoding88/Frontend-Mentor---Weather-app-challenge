"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBox = ({ onWeatherFetched }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const { latitude, longitude, country } = await getCoordinates(query);
      const weatherData = await getWeather(latitude, longitude);

      onWeatherFetched({ place: query, country, weather: weatherData });

      setQuery("");
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  async function getCoordinates(location) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=1&language=en&format=json`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding API failed: ${res.status}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0)
      throw new Error("Location not found");

    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      country: data.results[0].country,
    };
  }

  async function getWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API failed: ${res.status}`);
    return await res.json();
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
