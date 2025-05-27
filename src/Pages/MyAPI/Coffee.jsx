import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
const Coffee = () => {
  const { makeRequest, loading, data, error } = useRequestData();
  const [visibleCount, setVisibleCount] = useState(15);

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
            className="flex flex-col justify-between border rounded-2xl bg-amber-700/90 text-amber-400 p-4"
          >
            <h1 className="text-4xl">{coffee.title}</h1>
            <h2>Ingredients:</h2>
            <div className="mt-4 mb-4">
              {coffee.ingredients.map((i, index) => (
                <ul key={index} className="list-disc pl-5">
                  <li>{i}</li>
                </ul>
              ))}
            </div>
            <p>{coffee.description}</p>
            <figure>
              <img
                className="mx-auto mt-5 h-10/12"
                src={coffee.image}
                alt={coffee.title}
              />
            </figure>

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
