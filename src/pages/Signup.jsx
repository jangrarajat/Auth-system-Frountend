import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ErrorMessage from '../components/ErrorMessage'
import axios from 'axios'
import SuccessMessage from '../components/SuccessMessage'
import Laoder from '../components/Laoder'


function Signup() {
  const [loader, serLoaser] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  function handleSignup(e) {

    const { name, value } = e.target
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo)

  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { name, email, password } = loginInfo
    if (!name && !email && !password) {
      return ErrorMessage("Name , email , password  is required")
    }

    if (!name) {
      return ErrorMessage("Name is required")
    }
    if (!email) {
      return ErrorMessage("email is required")
    }

    if (!password) {
      return ErrorMessage("password is required")
    }


    try {
      serLoaser(true)
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/auth/signup`, loginInfo);

      SuccessMessage(res.data.message)
      console.log(res.data)
      if (res.data.success) {
        setTimeout(() => {

          navigate("/login")
          serLoaser(false)
        }, 950)
      }

    } catch (error) {
      serLoaser(false)
      console.log(error.response.data.error)
      if (error.response.data.error) {
        return ErrorMessage(error.response.data.error.details[0].message)
      }
      ErrorMessage(error.response.data.message)

    }
    // console.log(loginInfo)
  }

  return (
    <>
      {loader ? (<Laoder />) : (null)}


      <div className='w-full h-full   md:px-10 p-3'>
        <div className=' flex flex-col md:flex-row'>

          <div className='mt-10 md:mt-0 md:w-[50%] flex flex-row justify-center items-center'>
            <img className='h-48 md:h-[67%] rounded-lg' src="https://i.pinimg.com/1200x/9c/5c/3d/9c5c3dc3b6d1368aa46b2c95c50d6434.jpg" alt="signup image" />
          </div>


          <div className='md:w-[50%]  flex justify-center items-center'>
            <form
              onSubmit={submitForm}
              className='flex flex-col  justify-center items-center p-3 md:p-4 w-[90%]'>
              <h1 className='font-extrabold text-5xl mb-4 dark:text-white'>Signup</h1>
              <label className='w-[100%] h-9  md:h-14 pl-4 text-start' htmlFor="name"></label>
              <input
                onChange={handleSignup}
                className='w-[100%] h-9  md:h-14 pl-4 border-b-2 border-gray-500  dark:bg-gray-800 dark:rounded-lg dark:text-white'
                type="text"
                name='name'
                placeholder='Enter name'
              />

              <label className='w-[100%] h-9  md:h-14 pl-4 text-start ' htmlFor="email"></label>
              <input
                onChange={handleSignup}
                className='w-[100%] h-9  md:h-14 pl-4 border-b-2 border-gray-500 dark:bg-gray-800 dark:rounded-lg dark:text-white'
                type="email"
                name='email'
                placeholder='Enter email'
              />
              <label className='w-[100%] h-9  md:h-14 pl-4 text-start ' htmlFor="password"></label>
              <input
                onChange={handleSignup}
                className='w-[100%] h-9  md:h-14 pl-4  border-b-2 border-gray-500 dark:bg-gray-800 dark:rounded-lg dark:text-white'
                type="password"
                name='password'
                placeholder='Enter password'
              />
              <p
                className='text-gray-900 w-full text-start mt-11 pl-3 dark:text-white'>Already have an account !
                <Link to='/login' className='text-blue-900 ml-3'>
                  Login

                </Link>
              </p>
              <button className='w-[100%] h-10  md:h-14 bg-blue-400 mt-5 rounded-md text-white font-extralight text-2xl'
              >Signup</button>
            </form>
            <ToastContainer />
          </div>

        </div>


      </div>
    </>
  )
}

export default Signup
