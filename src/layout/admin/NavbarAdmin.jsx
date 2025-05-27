import { NavLink } from 'react-router'


const NavbarAdmin = () => {



    return (
        <nav className="w-2/5 p-6  min-h-screen text-white bg-gray-800">
            <title>{`${import.meta.env.VITE_BASE_DOCTITLE} Hjem`}</title>
            <div>
                <div className="mb-6">
                    <a className="text-xl font-bold">Dataservice A/S</a>
                </div>

                <menu className="space-y-4 flex flex-col">
                    <li>
                        <NavLink to="/admin" className="px-4 py-2 text-white rounded hover:bg-gray-700">ADMIN Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="px-4 py-2 text-white rounded hover:bg-gray-700">Forsiden (public)</NavLink>
                    </li>
                    <li>
                        <NavLink to="reviewCreate" className="px-4 py-2 text-white rounded hover:bg-gray-700 capitalize">Create a review</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/reviewEditDel" className="px-4 py-2 text-white rounded hover:bg-gray-700 capitalize">Edit reviews</NavLink>
                    </li>
                </menu>
            </div>


        </nav >
    )
}

export default NavbarAdmin