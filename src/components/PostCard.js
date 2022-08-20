import React, { useEffect, useState } from 'react'
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
    XIcon
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import CommentSection from './CommentSection';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import NonUserProfile from './NonUserProfile';

function PostCard({ post, user, getData }) {
    const [comment, setComment] = useState('')
    const [postId, setPostId] = useState({})
    const [searchParams, setSearchParams] = useSearchParams({ n: 0 })
    let nonUserId = searchParams.get('n')

    // const [nonUserId,setNonUserId] = useState('')

    const [hasLike, setHasLike] = useState(true)
    const [showComment, setShowComment] = useState(false)
    const [buttonPopup, setButtonPopup] = useState(false)

    const navigate = useNavigate()

    // function padTo2Digits(num) {
    //     return num.toString().padStart(2, '0');
    //   }

    // function formatDate(date) {
    //     return [
    //       padTo2Digits(date.getDate()),
    //       padTo2Digits(date.getMonth() + 1),
    //       date.getFullYear(),
    //     ].join('/');
    //   }

    function handleSubmitComment(e) {
        e.preventDefault()
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id, post_id: postId.id, content: comment
            })
        })
            .then(r => r.json())
            .then(setComment(''))
            .then(r => getData())
    }

    function handleLike(e) {
        e.preventDefault()

        fetch('/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: postId.id, user_id: user.id
            })
        })
            .then(r => r.json())
            .then(setHasLike(!hasLike))
            .then(r => getData())
    }

    function handleUnlike(e) {
        e.preventDefault()

        fetch(`/unlike/${postId.id}`,
            { method: 'DELETE' })
            .then(r => r.json())
            .then(setHasLike(!hasLike))
            .then(r => getData())
    }

    function handleDeletePost() {
        fetch(`/posts/${postId.id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(window.location.reload())
    }

    function handleRerouteProfile() {
        setSearchParams({ n: post.user.id })
        setTimeout(() => {
            navigate(`/users/${nonUserId}`)
        }, 1000)
    }

    function handleUnfollow() {
        // console.log('hello')
        fetch(`/unfollow/${postId.user.id}`,
            { method: 'DELETE' })
            .then(r => r.json())
            .then(window.location.reload())
    }

    const popUp = (
        (buttonPopup)
            ? (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setButtonPopup(!buttonPopup)} />

                {user.id !== post.user.id ?
                    (<div className='cursor-pointer rounded-xl relative w-full max-w-[400px] h-[100px] bg-white flex flex-col place-content-center'>
                        <button onClick={() => {
                            handleUnfollow()
                        }}>
                            <div className='border-b-2 w-full h-10 pb-2 mb-2 translate-y-2'>
                                <p className='text-md font-semibold text-center'>Unfollow</p>
                            </div>
                        </button>

                        <button onClick={() => { setButtonPopup(!buttonPopup) }} >
                            <div className='border-none w-full h-10 mb-2 translate-y-2'>
                                <p className='text-md font-semibold text-center'>Cancel</p>
                            </div>
                        </button>
                    </div>)
                    :
                    (<div className='cursor-pointer rounded-xl relative w-full max-w-[400px] h-[100px] bg-white flex flex-col place-content-center'>
                        <button onClick={(post) => { handleDeletePost(post) }}>
                            <div className='border-b-2 w-full h-10 pb-2 mb-2 translate-y-2'>
                                <p className='text-md font-semibold text-center'>Delete Post</p>
                            </div>
                        </button>
                        <button onClick={() => setButtonPopup(!buttonPopup)} >
                            <div className='border-none w-full h-10 mb-2 translate-y-2'>
                                <p className='text-md font-semibold text-center'>Cancel</p>
                            </div>
                        </button>
                    </div>)}
            </div>)
            : ""
    )

    return (
        <div className='bg-white my-7 border rounded-md'>
            {/* Header */}
            <div className='flex items-center justify-between p-2'>
                {/* <Link to={`/users/${nonUserId}`}> */}
                <div onClick={() => {
                    // setNonUserId(post.user.id)
                    handleRerouteProfile()
                }}
                    className='flex flex-row items-center cursor-pointer'>
                    <img className='rounded-full h-12 w-12 object-cover border p-1 mr-3' src={post.user.avatar_url} alt='' />
                    <p className='flex-1 font-bold'>{post.user.username}</p>
                </div>
                {/* </Link> */}

                <div>
                    <DotsHorizontalIcon onClick={() => {
                        setPostId(post)
                        setButtonPopup(!buttonPopup)
                    }} className='h-5 cursor-pointer' />
                </div>
            </div>

            {/* img */}
            <img className='object-cover w-full aspect-square' src={post.img_url} alt />

            {/* buttons */}
            <div className='flex justify-between px-4 pt-2'>
                <div className='flex space-x-4'>
                    {hasLike ?
                        (<form onSubmit={handleLike}>
                            <button>
                                <HeartIcon onSubmit={handleLike} onClick={() => { setPostId(post) }} className='postBtn' />
                            </button>
                        </form>) :
                        (<form onSubmit={handleUnlike}>
                            <button>
                                <HeartIconFilled onSubmit={handleUnlike} onClick={() => { setPostId(post) }} className='postBtn text-red-500' />
                            </button>
                        </form>)}
                    <ChatIcon onClick={() => setShowComment(() => {
                        setPostId(post)
                        if (post.id === postId.id) { setShowComment(!showComment) }
                    })} className='postBtn' />
                    <PaperAirplaneIcon className='postBtn rotate-45' />
                </div>
                <BookmarkIcon className='postBtn' />
            </div>

            {/* caption */}
            <div className='px-4 pb-1 truncate'>
                <span className='font-semibold'>{post.likes.length} likes</span><br />
                <span className='font-bold mr-1'>{post.user.username} </span>
                {post.caption}

            </div>


            {/* comments */}
            {showComment ?
                <CommentSection key={post.id} post={post} />
                : <div onClick={() => setShowComment(!showComment)} className='px-4 pb-2 cursor-pointer text-gray-500'>
                    <span>{post.comments.length > 0 ? (`View all ${post.comments.length} comments`) : null}</span>
                </div>}

            {/* created at */}
            {/* <div className='text-gray-400 text-xs uppercase h-6 p-4 mb-4 '>
                {(e) => formatDate(e.created_at)}
            </div> */}


            {/* input box */}
            <form onSubmit={handleSubmitComment} className='flex items-center p-2 border-t-2'>
                <EmojiHappyIcon className='h-7' />
                <input onClick={(e) => { setPostId(post) }} onChange={(e) => setComment(e.target.value)} className='border-none flex-1 focus:ring-0 outline-none' type='text' name='commentInput' placeholder='Add a comment' value={comment} />
                <button onClick={() => setShowComment(true)} className='font-semibold text-blue-400'>Post</button>
            </form>

            <div>
                {popUp}
            </div>
        </div>
    )
}

export default PostCard