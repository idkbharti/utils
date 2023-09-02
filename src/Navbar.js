import React, { useState } from 'react'
import Lottie from 'react-lottie';
import animationData from './a.json'; 
// import {Link} from "react-router-dom"

export default function Navbar() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }// Your Lottie animation JSON
  };

  return (
    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a href="" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
      <Lottie options={defaultOptions} height={30} width={30} />

      <span className="ml-3 text-3xl dark:text-white">snap<span className='text-3xl dark:text-green-500'>URL</span></span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center cursor-pointer text-base justify-center">
      {/* <a href="/" className="mr-5 hover:text-gray-200">UrlShortner</a> */}
      {/* <a href="/" className="mr-5 hover:text-gray-200">QRGenerator</a> */}

    </nav>
    {/* <button
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } py-2 px-4 rounded`}
      onClick={toggleDarkMode}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button> */}
  </div>
</header>
  )
}
