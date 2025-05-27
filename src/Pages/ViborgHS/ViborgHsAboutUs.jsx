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
            <article className="flex flex-col gap-10 mt-10 fontFamily ">
                <h1 className="text-4xl text-black">  {data.title}  </h1>
                <div className="bg-green-500 h-1 w-25"></div>
                 <div className="flex flex-col gap-4 text-gray-400">
                    {parse(data.content)}
                 </div>
                 <div className="w-full flex justify-start m-auto">
                  <NavLink className="bg-green-500 rounded-2xl p-4 text-white flex justify-start" to={"/ViborgsAnmeldelser"}>Reviews!</NavLink>
                 </div>
            </article>
        }

    </section>
  )
}

export default ViborgHsAboutUs