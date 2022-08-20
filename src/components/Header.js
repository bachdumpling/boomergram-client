import React, { useEffect, useState } from 'react'
import { SearchIcon, PlusCircleIcon, ChatIcon, HeartIcon, UserGroupIcon, MenuIcon } from "@heroicons/react/outline"
import { HomeIcon } from "@heroicons/react/solid"
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState } from './atoms/modalAtom'
import Search from './Search'

function Header({ user }) {

    const [open, setOpen] = useRecoilState(modalState)

    const [searchTerm, setSearchTerm] = useState('')

    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch('/users')
            .then(r => r.json())
            .then(r => {
                if (r.length > 0) { setUserData(r) }
            })
    }, [])

    console.log(userData)

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='absolute w-full h-full top-16 right-16 grid justify-center'>
                <Search userData={userData} searchTerm={searchTerm} />
            </div>

            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>

                {/* left */}
                <div className='relative flex items-center hidden lg:inline-grid w-28 cursor-pointer object-contain'>
                    <Link to='/'><img src='https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg' /></Link>
                </div>
                <div className='relative flex items-center w-10 lg:hidden shrink-0 cursor-pointer object-contain'>
                    <Link to='/'><img src='https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png' /></Link>
                </div>

                {/* middle */}
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md '>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }} className='bg-gray-100 w-72 block w-full pl-10 sm:text-sm border-none rounded-md focus:ring-black focus:border-gray-600' type='text' placeholder='Search' />
                    </div>
                </div>

                {/* right */}
                <div className='flex items-center justify-end space-x-4'>

                    <Link to='/'><HomeIcon className='navBtn' /></Link>
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />
                    <div className='relative'>
                        <ChatIcon className='navBtn' />
                        <div className='absolute hidden lg:inline-grid -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse'>3</div>

                    </div>
                    <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
                    <UserGroupIcon className='navBtn' />
                    <HeartIcon className='navBtn' />

                    <Link to='/profile'>
                        <img src={user.avatar_url} className='h-7 w-7 rounded-full cursor-pointer object-cover' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header