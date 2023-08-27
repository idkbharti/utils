import React from 'react'

function UrlShortner() {
  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">From Long Link to Short Chic!</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Unraveling the Digital Labyrinth: Transforming This Long URL into a Tiny Enigma!.</p>
    </div>
    <div className="flex lg:w-1/3 w-full sm:flex-row flex-row mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
      <div className="relative flex-grow w-1/2">
        <label for="full-name" className="leading-7 text-sm text-gray-600">Paste the lengthy URL here!</label>
        <input type="text" id="full-name" name="full-name" className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      {/* <div className="relative flex-grow w-full">
        <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div> */}
      <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">GO</button>
    </div>
  </div>
</section>
  )
}

export default UrlShortner;