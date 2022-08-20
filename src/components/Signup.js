import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatar_url, setAvatar_url] = useState('');

  const navigate = useNavigate()

  function handleSignup(e) {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, bio, avatar_url }),
    })
      .then(r => {
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 1000)
      })
  }

  return (
    <div className='bg-gray-50 h-screen grid justify-items-center'>
      <div className=' bg-gray-50 h-[900px] w-full grid place-items-center'>
        <div className='absolute grid justify-items-center bg-white w-96 h-100 border'>
          <div className='bg-white pt-12'>
            <img className='w-48 cursor-pointer object-contain pb-10' src='https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg' alt />
          </div>

          <form onSubmit={handleSignup} className='w-full h-full space-y-2 grid justify-items-center'>
            <input onChange={(e) => setUsername(e.target.value)} className='bg-gray-50 border-gray-300 rounded-sm w-9/12 h-10 focus:ring-black text-xs' placeholder='Username...' type='text' name='username' required />
            <input onChange={(e) => setPassword(e.target.value)} className='bg-gray-50 border-gray-300 rounded-sm w-9/12 h-10 focus:ring-black text-xs' placeholder='Password...' type='password' name='password' required />
            <input onChange={(e) => setBio(e.target.value)} className='bg-gray-50 border-gray-300 rounded-sm w-9/12 h-10 focus:ring-black text-xs' placeholder='Bio...' type='text' name='bio' required />
            <input onChange={(e) => setAvatar_url(e.target.value)} className='bg-gray-50 border-gray-300 rounded-sm w-9/12 h-10 focus:ring-black text-xs' placeholder='Avatar URL...' pattern="https://.*" type='url' name='avatar' required />
            <div className='text-white grid place-items-center text-center font-semibold bg-blue-500 rounded-sm text-sm w-9/12 h-8'>
              {/* <Link to='/'> */}
              <button>Sign Up</button>
              {/* </Link> */}
            </div>
          </form>

          <div className='text-center text-sm pt-5 pb-10'>
            <p>Already have an account?</p> <Link to='/login'><button className='text-blue-500 font-semibold'>Log In</button></Link>
          </div>

        </div>
      </div>

      {/* footer */}
      <div className='mb-10 max-w-5xl grid justify-items-center'>
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

export default Signup