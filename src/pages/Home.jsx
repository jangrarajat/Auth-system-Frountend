import React, { useEffect, useState } from 'react'
import SuccessMessage from '../components/SuccessMessage'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import Laoder from '../components/Laoder'

function Home() {
  const [loader, serLoaser] = useState(false)
  const navigator = useNavigate()
  let [foods, setFoods] = useState()
  const [loggedInUser, setLoggedInUser] = useState('')
  const [loggedInUserEmail, setloggedInUserEmail] = useState('')


  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
    setloggedInUserEmail(localStorage.getItem('loggedInUserEmail'))
  }, [])

  function handleLogout(e) {
    serLoaser(true)
    let msg = '"Use loggedout !"'
    SuccessMessage(msg)

    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserEmail');

    setTimeout(() => {
      serLoaser(false)
      navigator('/login')
    }, 950)
  }


  const getAllFoodData = async () => {
    const headers = {
      headers: { "Authorization": localStorage.getItem('token') }
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${API_URL}/food`, headers)
      const foods = await res.data


      setFoods(foods)



    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllFoodData()
  }, [])





  // leasting food table 









  return (
    <>
      {loader ? (<Laoder />) : (null)}
    
      
        

      <nav className='border border-b-gray-700 mb-4 w-full h-20 flex flex-row items-center justify-between px-3'>
        <div><h1 className='font-extrabold'>Welcome<span className='text-blue-600 font-extrabold ml-1'>{loggedInUser}</span></h1></div>

        <div>

          <div className='flex flex-row items-center gap-3'>
            <div className=' w-16 flex flex-row  justify-center items-center  cursor-pointer '>
           
              <img className='w-full' src="https://i.pinimg.com/1200x/d2/25/07/d2250772dc3221bfe9ed14d1d4cf0ec7.jpg" alt="user logo" />
            </div>


            <button
              onClick={handleLogout}
              className='bg-gray-900 text-white p-2 px-4 rounded-md'
            > Logout</button>
          </div>
        </div>
      </nav>




      <div>

          <h1 className=' mb-4'>{loggedInUserEmail}</h1>



        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-indigo-600 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Serving</th>
                <th className="px-6 py-3">Calories</th>
                <th className="px-6 py-3">Protein (g)</th>
              </tr>
            </thead>
            <tbody>
              {
                foods && foods?.map((food, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50">
                    <td className="px-6 py-4">{food.id}</td>
                    <td className="px-6 py-4">{food.name}</td>
                    <td className="px-6 py-4">{food.serving}</td>
                    <td className="px-6 py-4">{food.calories}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">{food.protein_g}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>



        <ToastContainer />
      </div>

    </>


  )
}

export default Home
