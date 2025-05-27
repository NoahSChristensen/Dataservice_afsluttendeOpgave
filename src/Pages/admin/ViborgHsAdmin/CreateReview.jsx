import useRequestData from "../../../hooks/useRequestData";
import { useNavigate } from "react-router";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";

const CreateReview = () => {
  const navigate = useNavigate();

  const { makeRequest, loading, data, error } = useRequestData();

  // Submit request
  const handleSubmit = (e) => {
    // e.preventDefault() // Undgår at reload siden - Har måske brug for at reload, for at kunne se nyt data
    console.log("Review created!");

    const popUp = window.confirm("Do you want to post this review?");
    if (!popUp) return;

    const sucess = makeRequest(
      `http://localhost:5023/reviews/admin/`,
      "POST",
      e.target,
    );

    if (sucess && popUp) {
      navigate("/admin");
    }
  };
  return (
    <section>
      {loading && <Loader></Loader>}
      {error && <Error></Error>}
      <title>{`${import.meta.env.VITE_BASE_DOCTITLE} Create review`}</title>

      <h1 className="mb-5 text-4xl font-semibold text-blue-800 capitalize italic">
        Write a review!
      </h1>

      <form
        className="rounded-2xl border border-slate-100 bg-slate-50 p-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl">Fill out the formula</h2>

        {/* NAVN */}
        <label className="my-4 w-full">
          Author name
          <input
            type="text"
            name="author"
            required
            placeholder="Author name..."
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>


        {/* Content*/}
        <label className="my-4 w-full">
          Description full
          <textarea
            name="content"
            className="h-40 w-full resize rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </label>

        <button
          type="submit"
          className="pointer mx-2 inline-block rounded bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-700"
        >
          Save
        </button>
        {/* className="inline-block px-4 py-2 mt-5 mb-10 font-bold text-white bg-emerald-500 rounded hover:bg-emerald-700" */}
      </form>
    </section>
  );
};

export default CreateReview;
