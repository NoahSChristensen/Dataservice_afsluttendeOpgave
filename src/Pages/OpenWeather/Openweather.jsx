import React, { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import LeafletMap from "./LeafletMap";

const Openweather = () => {
  const { makeRequest, loading, data, error } = useRequestData();
  const [lat, setLat] = useState(56.4125); // Grenå latitude
  const [lon, setLon] = useState(10.9211);  // Grenå longitude
  const [searchTerm, setSearchTerm] = useState("");

  // const lat = data?.city?.coord?.lat || lat;
  // const lon = data?.city?.coord?.lon || lon;

  useEffect(() => {
    makeRequest(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
    );
  }, [lat, lon]);


  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)

      const geoData = await geoRes.json();
    if (geoData && geoData.length > 0) {
      setLat(geoData[0].lat);
      setLon(geoData[0].lon);
    } else {
      alert("No location found. Please try again.");
    }
  }

  console.log(data);

  return (
    <section>

      <title>{`${import.meta.env.VITE_BASE_DOCTITLE} OpenWeather`}</title>

            <form className="grid grid-cols-1"> 
        <label htmlFor="weatherSearch" className="text-gray-500 italic underline ">Type city name here:</label>
        <div className="flex gap-4">
        <input id="weatherSearch" onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm  } required className="rounded-2xl" type="text" placeholder="Søg her..." />
        <button onClick={handleSearch} className="hover:cursor-pointer hover:text-white hover:bg-blue-300 rounded-2xl w-35 border transition-all duration-314">Search</button>
        </div>
        </form>

        {data &&
          <h1 className="text-4xl font-semibold capitalize">
            Weather forecast for: {data.city.name}
          </h1>
        }

        <div className="grid grid-cols-8 gap-4">
          {data && data.list.slice(0, 8).map((item, index) => (
            <div key={index} className="my-2 p-2 border rounded-lg">
              <h2 className="font-bold">kl. {new Date(item.dt * 1000).toLocaleString([], {hour: "2-digit", minute: "2-digit" ,hour12:false})}</h2>
              <p>{item.weather[0].description}</p>
              <p>Temperature: {Math.round(item.main.temp - 273.15)}°C</p>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}  alt="Vejrikon" />
            </div>
          ))}
          
        </div>
    

      {/* LeafletMap */}
      <div className="my-10 rounded-2xl border p-5">
        {data && (
          <LeafletMap
            lat={lat}
            lon={lon}
            zoom={15}
            weather={
              data.list[0].weather[0].description +
              " - " +
              Math.round(data.list[0].main.temp - 273.15) +
              "°C"
            }
          />
        )}
      </div>
    </section>
  );
};

export default Openweather;
