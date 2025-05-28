import useRequestData from "../../../hooks/useRequestData";
import { useEffect } from "react";
import { Link } from "react-router";
import { NavLink } from "react-router";
import "../../../assets/forms.css";
import "../../../assets/table.css";

const EditDelREview = () => {
  // GET alle
  const { makeRequest, loading, data, error } = useRequestData();

  // Delete:
  const {
    makeRequest: MakeRequestDEL,
    loading: loadingDEL,
    data: dataDEL,
    error: errorDEL,
  } = useRequestData();

  useEffect(() => {
    makeRequest(`http://localhost:5023/reviews`);
  }, [dataDEL]);

  const HandleDelete = (_id) => {
    // Kan lave sin egen window.confirm box - brug html-dialog
    if (window.confirm(`Are you sure you want to delete ${_id}`)) {
      MakeRequestDEL(`http://localhost:5023/reviews/admin/${_id}`, "DELETE");
    }
  };

  console.log(data);

  return (
    <div>
      <title>{`${import.meta.env.VITE_BASE_DOCTITLE} Hjem`}</title>
      <h1 className="text-4xl">Admin Characters</h1>

      <section className="mt-5">
        <table className="table">
          <thead className="thead">
            <tr className="text-center">
            </tr>
            <tr className="capitalize">
              <th>Author</th>
              <th>Content</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((d) => (
                <tr key={d._id}>
                  <td className="text-center">{d.author}</td>
                  <td> {d.content} </td>
                  <td>
                    <NavLink
                      className="mx-2 rounded bg-blue-500 p-2 text-center text-white hover:cursor-pointer"
                      state={{ d: d }}
                      to={`/admin/EditReview/${d._id}`}
                    >
                      Edit
                    </NavLink>
                  </td>
                  <td className="text-center">
                    <button
                      className="mx-2 rounded bg-rose-500 p-2 text-white hover:cursor-pointer"
                      onClick={() => HandleDelete(d._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default EditDelREview;
