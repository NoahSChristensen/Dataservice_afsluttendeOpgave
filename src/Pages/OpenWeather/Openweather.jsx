import React, { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import LeafletMap from "./LeafletMap";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const Openweather = () => {
  const { makeRequest, loading, data, error } = useRequestData();
  const [lat, setLat] = useState(56.4125); // Grenå latitude
  const [lon, setLon] = useState(10.9211); // Grenå longitude
  const [searchTerm, setSearchTerm] = useState("");

  // const lat = data?.city?.coord?.lat || lat;
  // const lon = data?.city?.coord?.lon || lon;

  useEffect(() => {
    makeRequest(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    );
  }, [lat, lon]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    );

    const geoData = await geoRes.json();
    if (geoData && geoData.length > 0) {
      setLat(geoData[0].lat);
      setLon(geoData[0].lon);
    } else {
      alert("No location found. Please try again.");
    }
  };

  console.log(data);

  return (
    <section className="mt-10">
      <title>{`${import.meta.env.VITE_BASE_DOCTITLE} OpenWeather`}</title>

      {/* Søge funktion til OpenWeather API: */}
      <form className="grid grid-cols-1 gap-4">
        <label
          htmlFor="weatherSearch"
          className="text-gray-500 italic underline"
        >
          Type city name here:
        </label>
        <div className="flex gap-4">
          <input
            id="weatherSearch"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            required
            className="rounded-2xl"
            type="text"
            placeholder="Søg her..."
          />
          <button
            onClick={handleSearch}
            className="w-35 rounded-2xl border transition-all duration-314 hover:cursor-pointer hover:bg-blue-300 hover:text-white"
          >
            Search
          </button>
        </div>
      </form>

      {/* Viser navnet på byen, hvis der er data: */}
      {data && (
        <h1 className="mt-4 mb-10 text-4xl font-semibold capitalize">
          Weather forecast for: {data.city.name}
        </h1>
      )}

      {/* Vejrdata for de næste 24 timer: */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
        {data &&
          data.list.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="my-2 rounded-lg border bg-gray-400/50 p-2 text-center"
            >
              <h2 className="font-bold">
                kl.{" "}
                {new Date(item.dt * 1000).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </h2>
              <div className="flex flex-col items-center gap-4 mt-4">
                <p>{item.weather[0].description}</p>
                <p>Temperature: {Math.round(item.main.temp)}°C</p>
                <p>Feels like: {Math.round(item.main.feels_like)}°C</p>
              </div>
              <img
                className="mx-auto"
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                alt="Vejrikon"
              />
            </div>
          ))}
      </div>

      {/* LeafletMap */}
      <div className="my-10 rounded-2xl border p-5">
        {loading ? (
          <Loader />
        ) : data ? (
          <LeafletMap
            lat={lat}
            lon={lon}
            zoom={15}
            weather={
              data.list[0].weather[0].description +
              " - " +
              Math.round(data.list[0].main.temp) +
              "°C"
            }
          />
        ) : null}
      </div>
    </section>
  );
};

export default Openweather;
