import React, { useEffect, useState } from 'react'
import SuccessMessage from '../components/SuccessMessage'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import Laoder from '../components/Laoder'
import Navbar from '../components/Navbar'
import FoodTable from '../components/foodTable'
import LandingPage from '../components/LandingPage'

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


  return (
    <>

      {/* Loader  */}

      {loader ? (<Laoder />) : (null)}

      {/* Navbar  */}
      {/* <Navbar */}

   <LandingPage  handleLogout={handleLogout} loggedInUser={loggedInUser} />

      {/* FoodTable  */}

      {/* <FoodTable foods={foods} /> */}


      <ToastContainer />


    </>


  )
}

export default Home
