import React, { useState } from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { XIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";

function ProfilePost({ user, postButtonPopUp, setPostButtonPopUp, onePost }) {
    
    const [hasLike, setHasLike] = useState(true)

    const [comment, setComment] = useState('')

    function handleLike(e) {
        e.preventDefault()

        fetch('/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: onePost.id, user_id: user.id
            })
        })
            .then(r => r.json())
            .then(setHasLike(!hasLike))
            // .then(getData())
    }

    function handleUnlike(e) {
        e.preventDefault()

        fetch(`/unlike/${onePost.id}`,
            { method: 'DELETE' })
            .then(r => r.json())
            .then(setHasLike(!hasLike))
            // .then(getData())
    }

    function handleSubmitComment(e) {
        e.preventDefault()
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id, post_id: onePost.id, content: comment
            })
        })
            .then(r => r.json())
            .then(setComment(''))
            // .then(getData())
    }
    console.log(onePost)

    const postPopUp = (
        (postButtonPopUp) ?
            (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50 transition-transform ease-in duration-300'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setPostButtonPopUp(!postButtonPopUp)} />

                <div className='rounded-md relative w-full max-w-[1200px] h-[800px] bg-white flex flex-col place-content-center justify-center items-center'>
                    <div className='w-full h-full grid grid-cols-3 grid-rows-1'>
                        {/* img */}
                        <div className='col-span-2 border-6'>
                            <img className='object-cover w-[800px] h-[800px]' src={onePost.img_url} />
                        </div>

                        <div className='col-span-1'>
                            {/* username avatar */}
                            <div className='flex items-center justify-between px-4 py-4 border-b-2'>
                                <div className='flex flex-row items-center '>
                                    <img className='object-cover w-10 h-10 rounded-full' src={user.avatar_url} />
                                    <p className='pl-4 font-bold text-md'>{user.username}</p>
                                </div>

                                <div>
                                    <DotsHorizontalIcon className='h-5 cursor-pointer' />
                                </div>
                            </div>

                            {/* comments */}
                            <div className='grid h-[720px] content-between'>


                                <div className='px-4 py-4'>
                                    {(onePost.comments.length > 0 && (
                                        <div className='h-full overflow-y-auto scrollbar-thumb-black scrollbar-thin'>

                                            <span className='text-md flex-1 font-semibold'>{user.username} </span>{onePost.caption}
                                            {onePost.comments.map((comment) => {
                                                return <div className='flex items-center space-x-2 pt-3 pb-1' key={comment.id}>
                                                    <p className='text-md flex-1'>
                                                        <span className='font-semibold'>{comment.user.username}</span> {comment.content}</p>
                                                </div>
                                            })}
                                        </div>
                                    ))}
                                </div>

                                <div>

                                    {/* buttons */}
                                    <div className='border-t-2'>

                                        <div className='flex justify-between px-4 pt-2'>
                                            <div className='flex space-x-4'>
                                                {hasLike ?
                                                    (<form onSubmit={handleLike}>
                                                        <button>
                                                            <HeartIcon onSubmit={handleLike} className='postBtn' />
                                                        </button>
                                                    </form>) :
                                                    (<form onSubmit={handleUnlike}>
                                                        <button>
                                                            <HeartIconFilled onSubmit={handleUnlike} className='postBtn text-red-500' />
                                                        </button>
                                                    </form>)}

                                                <ChatIcon className='postBtn' />
                                                <PaperAirplaneIcon className='postBtn rotate-45' />
                                            </div>
                                            <BookmarkIcon className='postBtn' />
                                        </div>

                                        {/* likes */}
                                        <div className='px-4 py-2'>
                                            <span className='font-semibold'>{onePost.likes.length} likes</span><br />

                                        </div>
                                    </div>

                                    {/* comments input */}

                                    <form onSubmit={handleSubmitComment} className='flex items-center px-2 py-2 border-t-2'>
                                        <EmojiHappyIcon className='h-7' />
                                        <input onChange={(e) => setComment(e.target.value)} className='border-none flex-1 focus:ring-0 outline-none' type='text' name='commentInput' placeholder='Add a comment' value={comment} />
                                        <button className='font-semibold text-blue-400'>Post</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>)
            : null
    )

    // const popUp = (
    //     (deletePopUp)
    //         ? (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50'>
    //             <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setDeletePopUp(false)} />


    //             <div className='cursor-pointer rounded-xl relative w-full max-w-[400px] h-[100px] bg-white flex flex-col place-content-center'>
    //                 <button onClick={(post) => { handleDeletePost(post) }}>
    //                     <div className='border-b-2 w-full h-10 pb-2 mb-2 translate-y-2'>
    //                         <p className='text-md font-semibold text-center'>Delete Post</p>
    //                     </div>
    //                 </button>
    //                 <button onClick={() => setDeletePopUp(false)} >
    //                     <div className='border-none w-full h-10 mb-2 translate-y-2'>
    //                         <p className='text-md font-semibold text-center'>Cancel</p>
    //                     </div>
    //                 </button>
    //             </div>
    //         </div>)
    //         : ""
    // )

    return (
        <>
            {postPopUp}
            {/* {popUp} */}
        </>
    )
}

export default ProfilePost