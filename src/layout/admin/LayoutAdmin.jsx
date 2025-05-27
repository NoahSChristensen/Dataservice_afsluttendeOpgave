import { Outlet } from "react-router";
import NavbarAdmin from "./NavbarAdmin";

const LayoutAdmin = () => {
  return (
<section className="mx-auto bg-coffee-dark">

            <div className="flex">

                <NavbarAdmin />

                <main className="px-2 m-5 grow">
                    <Outlet />
                </main>
            </div>

        </section>
  );
};

export default LayoutAdmin;
