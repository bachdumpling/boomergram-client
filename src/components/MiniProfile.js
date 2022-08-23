import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function MiniProfile({ user, handleLogout }) {

    return (
        <div className='flex items-center justify-between mt-14 ml-10'>
            <img className='w-16 h-16 object-cover rounded-full border p-[2px]' src={user.avatar_url} alt />

            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>{user.username}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>


            <button onClick={handleLogout} className='text-blue-400 text-sm font-semibold'>Sign Out</button>

        </div>
    )
}

export default MiniProfile