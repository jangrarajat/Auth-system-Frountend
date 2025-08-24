import React from 'react'

function Laoder({ message = "Loading..." }) {
  return (
   <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-xl">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
    </div>
  )
}

export default Laoder
