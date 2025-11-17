import React from "react";
import Image from "next/image";
import { weatherCodeToIcon } from "./WeatherCodeMapping";

const WeatherIcon = ({ weatherCode }) => {
  const iconName = weatherCodeToIcon[weatherCode] || "sunny";
  console.log(iconName);
  return (
    <Image
      src={`/assets/images/icon-${iconName}.webp`}
      alt="weather-icon"
      width={120}
      height={120}
    ></Image>
  );
};

export default WeatherIcon;
