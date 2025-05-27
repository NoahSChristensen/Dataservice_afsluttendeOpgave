import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import ElPriceChart from "./ElPriceCharts";

const ElDk = () => {
  const { makeRequest, loading, data, error } = useRequestData();

  useEffect(() => {
    makeRequest(
      `https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=2025-05-19T00:00&end=2025-05-25T00:00&filter=%7B%22PriceArea%22:[%22${searchTerm}%22]%7D&sort=HourDK%20DESC`,
    );
  }, []);

  const [searchTerm, setSearchTerm] = useState("dk1");
  const [startDate, setStartDate] = useState("2025-05-19T00:00");
  const [endDate, setEndDate] = useState("2025-05-25T00:00");

  // Håndtere search
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm) {
      makeRequest(
        `https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=${startDate}&end=${endDate}&filter=%7B%22PriceArea%22:[%22${searchTerm}%22]%7D&sort=HourDK%20DESC`,
      );
    }
  };

  console.log(data);

  return (
    <section className="p-4">
      {/* Ændre område til dk1 eller dk2 i URL'en */}
      <form className="grid grid-cols-3">
        <input
          id="weatherSearch"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          required
          className="rounded-2xl"
          type="text"
          placeholder="Søg her..."
        />
        <button type="submit" onClick={handleSearch}>
          Søg her
        </button>
        {/* Kan vælge start og slutdato for at se elpriser: */}
        <div className="grid grid-cols-2 gap-4">
          <input
            onChange={(e) => setStartDate(e.target.value + "T00:00")}
            value={startDate.slice(0, 10)}
            list="startDate"
            type="date"
            autoComplete="off"
            id="startDate"
          />
          <input
            onChange={(e) => setEndDate(e.target.value + "T00:00")}
            value={endDate.slice(0, 10)}
            list="startDate"
            type="date"
            autoComplete="off"
            id="slutDato"
          />
        </div>
      </form>

      {data && data.records.length > 0 && (
        <ElPriceChart records={data.records} />
      )}

      {data &&
        data.records.slice(0, 24).map((item, index) => (
          <div
            key={index}
            className="my-2 grid grid-cols-3 rounded-lg border p-2"
          >
            {/* Pris i dkk */}
            <article>
              <h1>Price i DKK:</h1>
              <p>{Math.round(item.SpotPriceDKK)} Kr. </p>
            </article>

            {/* Pris i Euro */}
            <article>
              <h2>Pris i Euro</h2>
              <p>{Math.round(item.SpotPriceEUR)} Euro.</p>
            </article>

            {/* Hours */}
            <article>
              <h3>Time</h3>
              <p>
                {new Date(item.HourDK).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </article>
          </div>
        ))}
    </section>
  );
};

export default ElDk;
