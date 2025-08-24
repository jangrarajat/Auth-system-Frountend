import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ErrorMessage from '../components/errorMessage'
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


      <div className='w-full h-full   '>
        <div className=' flex flex-col md:flex-row'>

          <div className=' md:w-[50%] flex flex-row justify-center items-center'>
            <img className='h-48 md:h-full' src="https://i.pinimg.com/736x/5f/d1/16/5fd116d64b8b7e3cfcb8da7f807ede72.jpg" alt="signup image" />
          </div>


          <div className='md:w-[50%]'>
            <form
              onSubmit={submitForm}
              className='flex flex-col  justify-center items-center p-3 md:p-4'>
              <h1 className='font-extrabold text-5xl mb-4'>Signup</h1>
              <label className='w-[100%] h-9  md:h-14 pl-4 text-start' htmlFor="name"></label>
              <input
                onChange={handleSignup}
                className='w-[100%] h-9  md:h-14 pl-4 border-b-2 border-gray-500  '
                type="text"
                name='name'
                placeholder='Enter name'
              />

              <label className='w-[100%] h-9  md:h-14 pl-4 text-start ' htmlFor="email"></label>
              <input
                onChange={handleSignup}
                className='w-[100%] h-9  md:h-14 pl-4 border-b-2 border-gray-500'
                type="email"
                name='email'
                placeholder='Enter email'
              />
              <label className='w-[100%] h-9  md:h-14 pl-4 text-start ' htmlFor="password"></label>
              <input
                onChange={handleSignup}
                className='w-[100%] h-9  md:h-14 pl-4  border-b-2 border-gray-500'
                type="password"
                name='password'
                placeholder='Enter password'
              />
              <p
                className='text-gray-900 w-full text-start mt-11 pl-3'>Already have an account !
                <Link to='/login' className='text-blue-900 ml-3'>
                  Login

                </Link>
              </p>
              <button className='w-[100%] h-10  md:h-14 bg-blue-400 mt-28 rounded-md text-white font-extralight text-2xl'
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
