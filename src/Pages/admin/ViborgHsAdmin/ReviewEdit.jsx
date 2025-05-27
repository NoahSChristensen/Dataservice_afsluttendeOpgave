import { useLocation, useParams } from "react-router";
import { use, useEffect } from "react";
import useRequestData from "../../../hooks/useRequestData";
import { useNavigate } from "react-router";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";

const ReviewEdit = () => {
  const location = useLocation();
  const d = location.state?.d;
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(d);
  console.log(id);

  const { makeRequest, loading, data, error } = useRequestData();

  useEffect(() => {
    if (!d) {
      makeRequest(`http://localhost:5023/reviews/${id}`, "GET");
      console.log(makeRequest);
    }
  }, [d]);

  const dataContent = d || data;

  console.log(dataContent);

  //   Submit request
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review edited!");
    const popUp = window.confirm("Do you want to edit this review?");
    if (!popUp) return;

    const success = makeRequest(
      `http://localhost:5023/reviews/admin/${dataContent._id}`,
      "PUT",
      e.target,
    );

    if (success) {
      popUp;
      navigate("/admin/reviewEditDel");
    }
  };

  return (
    <section>
      {loading && <Loader></Loader>}
      {error && <Error></Error>}
      <title>{`${import.meta.env.VITE_BASE_DOCTITLE} Edit review`}</title>

      {dataContent && (
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl capitalize">Edit your review</h1>

          {/* Author */}
          <input
            type="text"
            name="author"
            required
            placeholder="Skriv dit navn her..."
            defaultValue={dataContent.author}
          />
          {/* Content */}
          <label className="my-4 w-full">
            Review
            <textarea
              name="content"
              defaultValue={dataContent.content}
              className="h-40 w-full resize rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </label>
          {/* button */}
          <button
            type="submit"
            className="pointer mx-2 inline-block rounded bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-700"
          >
            Save
          </button>
        </form>
      )}
    </section>
  );
};

export default ReviewEdit;
