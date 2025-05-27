import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const Coffee = () => {
  const { makeRequest, loading, data, error } = useRequestData();
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    makeRequest(`https://api.sampleapis.com/coffee/hot`);
  }, []);

  console.log(data);

  //   Loader resten af dataen hvis visibleCount er mindre end dataens længde
  const loadMore = () => {
    setVisibleCount(
      data.length > visibleCount ? visibleCount + 3 : data.length,
    );

    if (visibleCount >= data.length) {
      setVisibleCount(3);
    }
  };

  // Loader mindre data hvis visibleCount er større end 3
  const loadLess = () => {
    setVisibleCount(
      data.length > visibleCount ? visibleCount - 3 : data.length,
    );

    if (visibleCount <= 3) {
      setVisibleCount(3);
    }
  };

  return (
    <section className="mt-20 grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-3">
      {loading && <Loader />}
      {error && <Error />}
      <title>{`${import.meta.env.VITE_BASE_DOCTITLE} Coffee`}</title>
      {data &&
        data.slice(0, visibleCount).map((coffee) => (
          <div
            key={coffee.id}
            className="rounded-2 h-min-[400px] relative flex h-[500px] flex-col justify-between border bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${coffee.image})` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-amber-800/40"></div>

            <div className="text-white z-10 flex flex-col justify-between gap-4">
              <h1 className="text-4xl">{coffee.title}</h1>
              <h2>Ingredients:</h2>
              <div className="mt-4 mb-4">
                {coffee.ingredients.map((i, index) => (
                  <ul key={index} className="list-disc pl-5">
                    <li>{i}</li>
                  </ul>
                ))}
                <p>{coffee.description}</p>
              </div>
            </div>

            <a
              href="https://sampleapis.com/api-list/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="fontFamily mx-auto w-50 rounded-2xl bg-amber-700 p-2 text-center text-amber-400 capitalize hover:text-amber-300 hover:shadow-2xs"
            >
              Read more
            </a>
          </div>
        ))}

      {/* loadMore og loadLess knapperne */}
      <div className="mx-auto flex flex-row gap-4">
        {data && visibleCount < data.length && (
          <button
            className="fontFamily mx-auto w-50 rounded-2xl bg-amber-700 p-2 text-center text-amber-400 capitalize hover:text-amber-300 hover:shadow-2xs"
            onClick={loadMore}
          >
            Load more here!
          </button>
        )}

        <button
          className="fontFamily mx-auto w-50 rounded-2xl bg-amber-700 p-2 text-center text-amber-400 capitalize hover:text-amber-300 hover:shadow-2xs"
          onClick={loadLess}
        >
          Load less here!
        </button>
      </div>
    </section>
  );
};

export default Coffee;
