import "./App.css" // Importere Tailwind css
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout/Layout"
import Viborghaveservice from "./Pages/ViborgHS/Viborghaveservice";
import ViborgsHsReviews from "./Pages/ViborgHS/ViborgsHsReviews";
import Openweather from "./Pages/OpenWeather/Openweather";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import CreateReview from "./Pages/admin/ViborgHsAdmin/CreateReview";
import EditDelReview from "./Pages/admin/ViborgHsAdmin/EditDelReview";
import ReviewEdit from "./Pages/admin/ViborgHsAdmin/ReviewEdit";

function App() {

    return (
        <BrowserRouter>
        {/* content */}
            <Routes>
                <Route path="/" element={<Layout></Layout>}>

                    <Route path="viborghaveservice" element={<Viborghaveservice></Viborghaveservice>}></Route>

                    <Route path="ViborgsAnmeldelser" element={<ViborgsHsReviews></ViborgsHsReviews>}></Route>

                    <Route path="openweather" element={<Openweather></Openweather>}></Route>

                </Route>
                {/* admin */}
                <Route path="/admin" element={<LayoutAdmin></LayoutAdmin>}>

                    <Route path="reviewCreate" element={<CreateReview></CreateReview>}></Route>
                    <Route path="reviewEditDel" element={<EditDelReview></EditDelReview>}></Route>
                    <Route path="EditReview/:id" element={<ReviewEdit></ReviewEdit>}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )

};
export default App;