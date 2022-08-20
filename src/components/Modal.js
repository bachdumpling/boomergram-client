import React, { Fragment, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from './atoms/modalAtom'
// import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon, XIcon } from '@heroicons/react/outline';

function Modal({ user, updatePosts }) {
    const [buttonPopup, setButtonPopup] = useRecoilState(modalState)

    const [imgUrl, setImgUrl] = useState('')
    const [caption, setCaption] = useState('')
    // const [buttonPopup, setButtonPopup] = useState(false)

    function handleAddPost(e) {
        e.preventDefault()
        console.log('hello')

        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id, img_url: imgUrl, caption: caption
            })
        })
            .then(r => r.json())
            .then(r => updatePosts(r))
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

                        <form className='border-none pt-4  grid justify-items-center' onSubmit={handleAddPost}>
                            <div className='my-2 w-[500px] grid justify-items-center'>
                                <input
                                    onChange={(e) => setImgUrl(e.target.value)}
                                    type='url' className='w-9/12 border-none focus:ring-0 text-center' required
                                    placeholder='Please enter an image url' />
                            </div>

                            <div className='mb-4 w-[500px] grid justify-items-center'>
                                <input
                                    onChange={(e) => setCaption(e.target.value)}
                                    className='border-none w-9/12 focus:ring-0 text-center' type='text' placeholder='Please enter a caption' required />
                            </div>

                            <button
                                className=" w-6/12 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                                Upload Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>)
            : ""
    )

    // <Transition.Root show={open} as={Fragment} >
    //         <Dialog
    //             as="div"
    //             className="fixed z-10 inset-0 overflow-y-auto"
    //             onClose={setOpen}>

    //             <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    //                 <Transition.Child
    //                     as={Fragment}
    //                     enter="ease-out duration-300"
    //                     enterFrom="opacity-0"
    //                     enterTo="opacity-100"
    //                     leave="ease-in duration-200"
    //                     leaveFrom="opacity-100"
    //                     leaveTo="opacity-0"
    //                 >

    //                     <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
    //                 </Transition.Child>

    //                 <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
    //                     aria-hidden="true"> &#8203;</span>

    //                 <Transition.Child
    //                     as={Fragment}
    //                     enter="ease-out duration-300"
    //                     enterFrom="opacity- translate-y-4 sm:translate-y-0 sm:scale-95"
    //                     enterTo="opacity-100 translate-y-0 sm:scale-100"
    //                     leave="ease-in duration-200"
    //                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //                     leaveTo="opacity- translate-y-4 sm:translate-y-0 sm:scale-95">

    //                     <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 text-black'>

    //                         <div
    //                             // onClick={() => filePickerRef.current.click()}
    //                             className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
    //                             <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
    //                         </div>

    //                         <div className="mt-5 text-center sm:mt-6">
    //                             <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 ">
    //                                 Upload a photo
    //                             </Dialog.Title>

    //                             <form onSubmit={handleAddPost}>
    //                                 <div className='my-2'>
    //                                     <input
    //                                         onChange={(e) => setImgUrl(e.target.value)}
    //                                         type='url' className='border-none focus:ring-0 w-full text-center' required
    //                                         placeholder='Please enter an image url' />
    //                                 </div>

    //                                 <div className='mb-4'>
    //                                     <input
    //                                         onChange={(e) => setCaption(e.target.value)}
    //                                         className='border-none focus:ring-0 w-full text-center' type='text' placeholder='Please enter a caption' required />
    //                                 </div>

    //                                 <button
    //                                     onClick={(e) => handleAddPost}
    //                                     type="button"
    //                                     className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
    //                                     Upload Post
    //                                 </button>
    //                             </form>
    //                         </div>
    //                     </div>
    //                 </Transition.Child>
    //             </div>
    //         </Dialog >
    //     </Transition.Root >

    return (
        <div>
            {popUp}
        </div>
    )
}

export default Modal