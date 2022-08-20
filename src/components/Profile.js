import React, { useState } from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { HeartIcon, XIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';


function Profile({ user }) {
    // console.log(user.posts)
    const [buttonPopup, setButtonPopup] = useState(false)

    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState(user.bio);
    const [avatar_url, setAvatar_url] = useState(user.avatar_url);


    function handleEditProfile(e){
        e.preventDefault()
        // console.log('hello')
        fetch(`/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, bio, avatar_url }),
        })
    }


    const popUp = (
        (buttonPopup)
            ? (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setButtonPopup(!buttonPopup)} />

                <div className='rounded-xl relative w-full max-w-[600px] h-[600px] bg-white flex flex-col place-content-center justify-center items-center pb-4 pt-8'>
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <img className='h-20 w-20 rounded-full' src={user.avatar_url} />
                        <p className='font-semibold text-2xl'>{user.username}</p>
                    </div>

                    <form onSubmit={handleEditProfile} className='grid grid-flow-row grid-rows-5 grid-cols-4 w-full h-2/3 text-center pt-10'>

                        {/* Username */}
                        <div className='col-span-1 text-right pr-2 translate-y-2'>
                            <label className='font-semibold text-lg'>Username</label>
                        </div>

                        <div className='col-span-3'>
                            <input onChange={(e) => setUsername(e.target.value)} type='text' defaultValue={user.username} className=' border-gray-200 border-2 rounded-sm w-11/12 h-10 focus:ring-blue text-lg pl-2' />
                        </div>

                        {/* Bio */}
                        <div className='col-span-1 text-right pr-2 translate-y-2'>
                            <label className='font-semibold text-lg'>Bio</label>
                        </div>

                        <div className='col-span-3'>
                            <input onChange={(e) => setBio(e.target.value)} type='text' defaultValue={user.bio} className=' border-gray-200 border-2 rounded-sm w-11/12 h-10 focus:ring-blue text-lg pl-2' />
                        </div>

                        {/* Avatar */}
                        <div className='col-span-1 text-right pr-2 translate-y-2'>
                            <label className='font-semibold text-lg'>Avatar URL</label>
                        </div>

                        <div className='col-span-3'>
                            <input onChange={(e) => setAvatar_url(e.target.value)} type='url' defaultValue={user.avatar_url} className=' border-gray-200 border-2 rounded-sm w-11/12 h-10 focus:ring-blue text-lg pl-2' />
                        </div>

                        {/* Password */}
                        <div className='col-span-1 text-right pr-2 translate-y-2'>
                            <label className='font-semibold text-lg'>Password</label>
                        </div>

                        <div className='col-span-3'>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' required placeholder='Please confirm your password to edit profile' className=' border-gray-200 border-2 rounded-sm w-11/12 h-10 focus:ring-blue text-lg pl-2' />
                        </div>

                        <div className='w-full col-span-4'>
                            <button className='text-white mt-4 w-4/12 h-3/6 text-center font-semibold bg-blue-500 rounded-sm text-sm'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>)
            : ""
    )

    return (
        <div className='p-10 max-w-5xl mx-5 xl:mx-auto bg-gray-50 h-screen'>
            <div className='grid grid-cols-4 gap-4 border-b-2 pb-12'>
                <div className='avatar justify-center'>
                    <div className=' w-40 h-40 rounded-full'>
                        <img className=' object-fill' src={user.avatar_url} />
                    </div>
                </div>
                <div className='col-span-3 ml-10'>
                    <span className='text-4xl mr-4 font-extralight tracking-wider'>{user.username}</span>
                    <div className='cursor-pointer inline text-sm text-gray-700 font-semibold p-1 px-2 border border-gray-200 rounded mr-4' onClick={() => setButtonPopup(!buttonPopup)}>Edit Profile</div>

                    <div className='flex my-4'>
                        <div><span className='font-semibold'>{user.post_count}</span> posts</div>
                        <div className='ml-4'><span className='font-semibold'>{user.follower_count}</span> followers</div>
                        <div className='ml-4'><span className='font-semibold'>{user.following_count}</span> following</div>
                    </div>
                    <div><p>{user.bio}</p></div>
                </div>
            </div>

            <div className='pt-12 grid grid-cols-3 gap-7'>
                {user.posts.map((img) => {
                    return (
                        <div className='overflow-hidden aspect-square'>
                            <div className='relative group cursor-pointerÏ'>
                                <div className=' h-[300px] relative'>
                                    <img className='h-[300px] object-cover w-full' src={img.img_url} />
                                </div>

                                <div className="absolute top-0 opacity-0 group-hover:opacity-100 left-1/2 -translate-x-1/2 w-full h-full bg-black-rgba flex text-white justify-center items-center space-x-3">

                                    <div className='space-x-1'>
                                        <HeartIcon className='h-6 inline -translate-y-[2px]' /><span>{img.likes.length}</span>
                                    </div>

                                    <div className='space-x-1'>
                                        <FontAwesomeIcon className='scale-x-[-1]' icon={faComment} size='lg' /><span>{img.comments.length}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            {popUp}
            <Modal user={user} />
        </div>
    )
}

export default Profile