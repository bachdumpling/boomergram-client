import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from './atoms/modalAtom'
// import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon, XIcon } from '@heroicons/react/outline';
import Dictionary from './Dictionary';

function Modal({ user, updatePosts }) {
    const [buttonPopup, setButtonPopup] = useRecoilState(modalState)
    const [imgUrl, setImgUrl] = useState('')
    const [caption, setCaption] = useState('')
    const [captionReplacement, setCaptionReplacement] = useState('')
    console.log(`new caption '${captionReplacement}'`)
    console.log(caption)
    // console.log(captionReplacement)

    function findReplaceMent() {
        for (const key in Dictionary){
            console.log("KEY", key)
            if(caption.toLowerCase().includes(key)){
                // setTermReplacement(Dictionary[key])
                // console.log("VALUE",Dictionary[key]);
                setCaptionReplacement(caption.toLowerCase().replace(key,Dictionary[key]))
                return;
            }
        }

    }

    function handleAddPost(e) {
        e.preventDefault()

        setTimeout(() => {
            fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id, img_url: imgUrl, caption: captionReplacement
                })
            })
                .then(r => r.json())
                .then(setButtonPopup(false))
                .then(r => updatePosts(r))
        }, 1000);
    }

    const popUp = (
        (buttonPopup)
            ? (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setButtonPopup(!buttonPopup)} />
                <div className='rounded-xl relative w-full max-w-[640px] h-[350px] bg-white'>
                    <div className='border-b-2 w-full h-10 mb-10 translate-y-2'>
                        <p className='text-md font-semibold text-center'>Create new post</p>
                    </div>
                    <div className='grid justify-items-center w-full'>

                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 ">
                            <CameraIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                        </div>

                        <form className='border-none pt-4  grid justify-items-center'
                            onSubmit={(e) => handleAddPost(e)}
                        >
                            <div className='my-2 w-[500px] grid justify-items-center'>
                                <input
                                    onChange={(e) => setImgUrl(e.target.value)}
                                    type='url' className='w-9/12 border-none focus:ring-0 text-center' required
                                    placeholder='Please enter an image url' />
                            </div>

                            <div className='mb-4 w-[500px] grid justify-items-center'>
                                <input
                                    onChange={(e) => {
                                        setCaption(e.target.value)
                                    }}
                                    className='border-none w-9/12 focus:ring-0 text-center' type='text' placeholder='Please enter a caption' required />
                            </div>

                            <button onClick={() => {
                                findReplaceMent()
                            }}
                                className=" w-6/12 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                                Upload Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>)
            : ""
    )

    return (
        <div>
            {popUp}
        </div>
    )
}

export default Modal