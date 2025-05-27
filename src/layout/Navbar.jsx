import { useState } from "react";
import { NavLink } from "react-router";
import { GiHamburger } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);

  const menuItems = [
    { name: "home", path: "/" },
    { name: "Viborghaveservice", path: "viborghaveservice" },
    { name: "openWeather", path: "openweather" },
    { name: "El Priser", path: "eldk" },
    { name: "admin", path: "/admin" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 container mx-auto flex h-16 items-center justify-between bg-green-500/90 px-4 shadow-md">
      {/* Logo at the start */}
      <div className="flex items-center">
        <NavLink to={"/"} className="whiteText mx-4 font-semibold">
          ReactApp A/S
        </NavLink>
      </div>

      {/* Menu and burger at the end */}
      <div className="flex items-center">
        {/* Burger menu button - visible only on mobile */}
        <button
          onClick={() => setDropDown(!dropDown)}
          className="text-gray-800 focus:outline-none lg:hidden p-4 md:p-20"
        >
          <GiHamburger className="text-4xl text-white" title="Burger Menu" />
        </button>

        {/* Desktop Menu */}
        <menu className="hidden text-amber-50 sm:gap-9 lg:flex">
          {menuItems.map((item) => (
            <li className="list-none text-blue-500" key={item.name}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </menu>
      </div>

      {/* Mobile Dropdown Menu */}
      {dropDown && (
        <menu className="absolute top-16 left-0 z-50 w-full rounded-b-2xl bg-green-500/95 text-2xl font-semibold text-black underline underline-offset-4 shadow-md">
          {/* <button
            className="absolute top-5 right-4 text-3xl"
            onClick={() => setDropDown(false)}
            aria-label="Luk menu"
          >
            <AiOutlineClose />
          </button> */}
          <ul className="flex flex-col p-4">
            {menuItems.map((item) => (
              <li key={item.name} onClick={() => setDropDown(false)}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        </menu>
      )}
    </nav>
  );
};

export default Navbar;
