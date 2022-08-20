import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Search({ userData, searchTerm }) {
    const [searchParams, setSearchParams] = useSearchParams({ n: 0 })
    let nonUserId = searchParams.get('n')

    const navigate = useNavigate()

    function handleRerouteProfile(user) {
        setSearchParams({ n: user.id })
        setTimeout(() => {
            navigate(`/users/${nonUserId}`)
        }, 1000)
    }

    return (
        <div>
            {searchTerm 
            ?
                <div className='bg-white w-80 min-w-md items-center rounded-md shadow-md h-80 py-2 overflow-y-auto scrollbar-thumb-gray-400 scrollbar-round cursor-pointer'>
                    {userData.filter((user) => {
                        if (searchTerm == "") {
                            return null
                        } else if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return user
                        }

                    }).map((user, key) => {
                        return (
                            <div onClick={() => {handleRerouteProfile(user)}} className='grid grid-flow-col grid-cols-5 items-center truncate space-x-1 py-2 px-4' key={user.id}>
                                <img className='col-span-1 w-11 h-11 object-cover rounded-full border p-[2px]' src={user.avatar_url} />
                                <p className='text-left text-md font-semibold col-span-4'>{user.username}</p>
                            </div>
                        )
                    })}
                </div>
            : 
                null
            }

        </div>
    )
}

export default Search