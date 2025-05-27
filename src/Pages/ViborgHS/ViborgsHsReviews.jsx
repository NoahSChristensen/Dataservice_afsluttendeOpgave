import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import { motion, AnimatePresence } from "framer-motion";

const ViborgsHsReviews = () => {
  const { makeRequest, loading, data, error } = useRequestData();

  useEffect(() => {
    makeRequest(`http://localhost:5023/reviews`);
  }, []);

  const [sliderIndex, setSliderIndex] = useState(0);

  const handleClick = (index) => {
    setSliderIndex(index);
  };

  return (
    <div className="grid relative bg_image fontFamily h-screen">
      {/* transparent effect */}
      <div className="absolute inset-0 bg-green-500/70 pointer-events-none z-0"></div>
      {/* overskrift */}
      <section className="z-2">
        <h1 className="mt-25 text-center text-4xl whiteText font-semibold">Kundeudtalelser</h1>
        <div className="mx-auto mt-25 h-1 w-25 bg-gray-200/80"></div>
      </section>

      <section className="p-4 text-center">
        {/* Show selected review */}
        <div className="relative flex flex-col">
          {data && data[sliderIndex] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={sliderIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.314 }}
                className="absolute w-full"
              >
                <article className="flex flex-col gap-10 rounded p-6 whiteText">
                  <p className="prose-lg text-lg italic">
                    "{data[sliderIndex].content}"
                  </p>
                  <h2> -{data[sliderIndex].author} </h2>
                </article>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Knapper til at skifte anmeldelse */}
        <div className="mt-50 flex justify-center gap-4">
          {data &&
            data.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`rounded-4xl z-2 border px-4 py-2 ${
                  sliderIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {console.log(sliderIndex)}
              </button>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ViborgsHsReviews;
