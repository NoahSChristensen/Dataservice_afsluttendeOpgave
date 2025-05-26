import "./App.css" // Importere Tailwind css
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout"
import Viborghaveservice from "./Pages/ViborgHS/Viborghaveservice";
import ViborgsHsReviews from "./Pages/ViborgHS/ViborgsHsReviews";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout></Layout>}>

                    <Route path="viborghaveservice" element={<Viborghaveservice></Viborghaveservice>}></Route>

                    <Route path="ViborgsAnmeldelser" element={<ViborgsHsReviews></ViborgsHsReviews>}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )

};
export default App;