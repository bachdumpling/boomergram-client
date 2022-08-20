import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setUser }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    // console.log(e)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then(r => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        })
      }
    }).then(r => {
      setTimeout(() => {
        navigate('/')
        window.location.reload()
      }, 1000)
    })
  }

  return (
    <div className='bg-gray-50 h-screen grid justify-items-center'>
      <div className=' bg-gray-50 h-[900px] w-full grid place-items-center'>
        {/* Login section */}
        <div className='absolute grid justify-items-center bg-white w-96 h-96 border'>
          <div className='bg-white pt-12'>
            <img className='w-48 cursor-pointer object-contain' src='https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg' alt />
          </div>

          <form onSubmit={handleLogin} className='w-full h-full -space-y-1 grid justify-items-center'>
            <input onChange={(e) => setUsername(e.target.value)} className='bg-gray-50 border-gray-300 rounded-sm w-9/12 h-10 focus:ring-black text-xs' placeholder='Username...' type='text' name='username' required />
            <input onChange={(e) => setPassword(e.target.value)} className='bg-gray-50 border-gray-300 rounded-sm w-9/12 h-10 focus:ring-black text-xs' placeholder='Password...' type='password' name='password' required />
            <div className='text-white grid place-items-center text-center font-semibold bg-blue-500 rounded-sm text-sm w-9/12 h-8'>
              {/* <Link></Link> */}
              <button onClick={() => { }} >Log In</button>

            </div>
          </form>

          <div className='text-center text-sm pt-5'>
            <p>Don't have an account?</p> <Link to='/signup'><button className='text-blue-500 font-semibold'>Sign up</button></Link>
          </div>

        </div>
      </div>

      {/* footer */}
      <div className=' max-w-5xl grid justify-items-center'>
        <div className=''>
          <ul className='text-gray-400 grid grid-flow-col text-sm text-center scale-90 space-x-5'>
            <li>Meta</li>
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
            <li>Help</li>
            <li>Api</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Top Accounts</li>
            <li>Hashtags</li>
            <li>Locations</li>
            <li>Instagram Life</li>
            <li>Contact Uploading & Non-Users</li>
          </ul>
        </div >

        <div className='text-gray-400 flex justify-center text-sm text-center scale-90 space-x-5'>
          <span> English </span>
          <span> © 2022 Instagram from Meta </span>

        </div>
      </div>

    </div>
  )
}

export default Login