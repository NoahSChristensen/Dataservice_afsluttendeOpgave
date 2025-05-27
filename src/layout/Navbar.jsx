import { useState } from 'react'
import { NavLink } from 'react-router'
import { GiHamburger } from 'react-icons/gi'

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false)

  const menuItems = [
    { name: "home", path: "/" },
    { name: "Viborghaveservice", path: "viborghaveservice" },
    {name: "openWeather", path: "openweather"},
    {name:"admin", path: "/admin" }
  ]

  return (
    <nav className="container mx-auto">
      <section className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to={"/"} className="mx-4 font-semibold text-emerald-900">ReactApp A/S</NavLink>

        {/* Burger menu button - visible only on mobile */}
        <button
          onClick={() => setDropDown(!dropDown)}
          className="text-gray-800 lg:hidden focus:outline-none"
        >
          <GiHamburger title="Burger Menu"></GiHamburger>
        </button>

        {/* Desktop Menu */}
        <menu className="hidden lg:flex sm:gap-9 text-amber-50">
          {menuItems.map((item) => (
            <li className="text-blue-500 list-none" key={item.name}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </menu>
      </section>

      {/* Mobile Dropdown Menu */}
      {dropDown && (
        <menu className="mt-2 w-full rounded-md bg-gray-800/95 shadow-md z-50">
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
  )
}

export default Navbar
