import React from 'react'

function Navbar({ handleLogout , loggedInUser}) {
  return (
      <nav className='border border-b-gray-700 mb-4 w-full h-20 flex flex-row items-center justify-between px-3'>
        <div><h1 className='font-extrabold'>Welcome<span className='text-blue-600 font-extrabold ml-1'>{loggedInUser}</span></h1></div>

        <div>

          <div className='flex flex-row items-center gap-3'>
            <div className=' w-16 flex flex-row  justify-center items-center  cursor-pointer '>
           
              <img className='w-full' src="https://i.pinimg.com/1200x/d2/25/07/d2250772dc3221bfe9ed14d1d4cf0ec7.jpg" alt="user logo" />
            </div>


            <button
              onClick={handleLogout}
              className='bg-indigo-600 text-white p-2 px-4 rounded-md'
            > Logout</button>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
