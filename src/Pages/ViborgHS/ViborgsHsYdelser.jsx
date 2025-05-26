

const ViborgsHsYdelser = ({ data }) => {
  console.log(data);


  const selected = data
    ? [...data].sort(() => Math.random() - 0.5).slice(0, 2)
    : [];


  return (
    <section className="grid grid-cols-2 gap-4 p-4">
      {
        selected.map((item) => (
          <div key={item._id}>
            <figure className="flex flex-col gap-4">
              <img src={`/ydelser/${item.image}`} alt={item.title} />
              {console.log(`/ydelser/${item.image}`)}
              <figcaption>
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-gray-700 p-4 mt-4">{item.content}</p>
              </figcaption>
            </figure>
          </div>
        ))}
    </section>
  );
};

export default ViborgsHsYdelser;
