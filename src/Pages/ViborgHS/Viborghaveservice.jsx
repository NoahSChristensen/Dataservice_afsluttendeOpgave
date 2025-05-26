import useRequestData from "../../hooks/useRequestData"
import Loader from "../../components/Loader"
import Error from "../../components/Error"
import { useEffect } from "react"
import ViborgHsAboutUs from "./ViborgHsAboutUs"
import ViborgsHsYdelser from "./ViborgsHsYdelser"

const Viborghaveservice = () => {
  

    const {makeRequest, loading, data,error} = useRequestData();

    useEffect(() => {

        makeRequest(`http://localhost:5023/services`);

    }, [])
    console.log(data);

    const items = ['Item A', 'Item B', 'Item C', 'Item D'];

// Shuffle the array
const shuffled = items.sort(() => Math.random() - 0.5);

// Get the first 2 from the shuffled array
const selected = shuffled.slice(0, 2);

console.log(selected); // Shows 2 random items

    
  return (
    <main className="grid grid-cols-2 p-5">
        
        {loading && <Loader></Loader>}
        {error && <Error></Error>}

        <title>{`${import.meta.env.VITE_BASE_DOCTITLE}`}</title>
        {/* About Us */}
          <ViborgHsAboutUs></ViborgHsAboutUs>
        {/* Billeder der bliver skiftet ud, med Math.random */}
          <ViborgsHsYdelser data={data}></ViborgsHsYdelser>
    </main>
  )
}

export default Viborghaveservice