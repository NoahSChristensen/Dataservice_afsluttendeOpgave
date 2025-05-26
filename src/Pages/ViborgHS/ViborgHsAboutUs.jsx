import useRequestData from "../../hooks/useRequestData"
import { useEffect } from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import parse from 'html-react-parser';
import { NavLink } from "react-router";

const ViborgHsAboutUs = () => {

    const {makeRequest, loading, data, error} = useRequestData();

    useEffect(() => {

        makeRequest(`http://localhost:5023/aboutus`)

    }, [])

    console.log(data);
    

  return (
    <section className="p-4">
        {loading && <Loader></Loader>}
        {error && <Error></Error>}

        {data &&
            <article className="flex flex-col gap-10 mt-10">
                <h1 className="text-4xl">  {data.title}  </h1>
                 <div className="flex flex-col gap-4">
                    {parse(data.content)}
                 </div>
                 <NavLink to={"/ViborgsAnmeldelser"}>Reviews!</NavLink>
            </article>
        }

    </section>
  )
}

export default ViborgHsAboutUs