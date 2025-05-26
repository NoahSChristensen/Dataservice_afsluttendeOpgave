import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";

const ViborgsHsReviews = () => {
  const { makeRequest, loading, data, error } = useRequestData();

  useEffect(() => {
    makeRequest(`http://localhost:5023/reviews`);
  }, []);

  console.log(data);

  const [sliderIndex, setSliderIndex] = useState(0);

  const handleClick = (index) => {
    setSliderIndex(index);
  };

  return (
    <div className="grid">
      {/* overskrift */}
      <section>
        <h1 className="mt-25 text-center text-4xl">Kundeudtalelser</h1>
        <div className="mx-auto h-1 w-25 bg-amber-900"></div>
      </section>

      <section className="border p-4">
        {/* Show selected review */}
        <div className="flex flex-col">
          {data && data[sliderIndex] && (
            <article className="rounded p-6">
              <p className="text-lg">{data[sliderIndex].content}</p>
              <h2> {data[sliderIndex].author} </h2>
            </article>
          )}
        </div>

        {/* Knapper til at skifte anmeldelse */}
        <div className="flex justify-center gap-4 mt-4">
          {data &&
            data.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`rounded-full border px-4 py-2 ${
                  sliderIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
                {console.log(sliderIndex)}
              </button>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ViborgsHsReviews;
