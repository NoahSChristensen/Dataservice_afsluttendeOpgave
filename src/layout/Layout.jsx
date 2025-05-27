import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col justify-between border-8  border-yellow-400 md:border-orange-600 lg:border-red-600 xl:border-purple-700 2xl:border-blue-700">
      <title>{`${import.meta.env.VITE_BASE_DOCTITLE}`}</title>
      <Navbar></Navbar>
      <main className="container mx-auto flex-1 bg-gray-50 px-4">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Layout