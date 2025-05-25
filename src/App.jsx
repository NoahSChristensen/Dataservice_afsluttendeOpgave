import "./App.css" // Importere Tailwind css
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout"
import Viborghaveservice from "./Pages/Viborghaveservice";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout></Layout>}>

                    <Route path="viborghaveservice" element={<Viborghaveservice></Viborghaveservice>}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )

};
export default App;