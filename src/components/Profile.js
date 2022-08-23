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


function Profile({ user, updatePosts, getData }) {
    const postArr = user.posts.sort((x, y) => {
        return new Date(x.created_at) > new Date(y.created_at) ? 1 : -1
    }).reverse()

    const [buttonPopup, setButtonPopup] = useState(false)
    const [postButtonPopUp, setPostButtonPopUp] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [hasLike, setHasLike] = useState(true)
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState(user.bio);
    const [avatar_url, setAvatar_url] = useState(user.avatar_url);
    const [onePost, setOnePost] = useState({})

    const [comment, setComment] = useState('')
    const [showComment, setShowComment] = useState(false)

    // Hi! I'm Bach 🦦
    // https://images.unsplash.com/photo-1633967920376-33b2d94f091f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80

    function handleEditProfile(e) {
        e.preventDefault()

        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password, bio: bio, avatar_url: avatar_url }),
        })
            .then(r => r.json())
            .then(r => {
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            })
    }

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
            .then(getData())
    }

    function handleUnlike(e) {
        e.preventDefault()

        fetch(`/unlike/${onePost.id}`,
            { method: 'DELETE' })
            .then(r => r.json())
            .then(setHasLike(!hasLike))
            .then(getData())
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
            .then(getData())
    }

    function handleDeletePost() {
        fetch(`/posts/${onePost.id}`, {
            method: 'DELETE'
        })
            .then(r => r.json())
            .then(window.location.reload())
    }


    const editPopUp = (
        (buttonPopup)
            ? (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setButtonPopup(!buttonPopup)} />

                <div className='rounded-xl relative w-full max-w-[600px] h-[600px] bg-white flex flex-col place-content-center justify-center items-center pb-4 pt-8'>
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <img className='h-20 w-20 rounded-full object-cover' src={user.avatar_url} />
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
                            <input onChange={(e) => {
                                setBio(e.target.value)
                            }} type='text' defaultValue={user.bio} className=' border-gray-200 border-2 rounded-sm w-11/12 h-10 focus:ring-blue text-lg pl-2' />
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

    const postPopUp = (
        (postButtonPopUp) ?
            (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50 transition-transform ease-in duration-300'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setPostButtonPopUp(!postButtonPopUp)} />

                <div className='rounded-md relative w-[1200px] h-[800px] lg:max-w-[1500px] lg:max-h-[1000px] bg-white flex flex-col place-content-center justify-center items-center'>
                    <div className='w-full h-full grid grid-cols-3 grid-rows-1'>
                        {/* img */}
                        <div className='col-span-2 border-6'>
                            <img className='object-cover w-[1000px] h-[800px]' src={onePost.img_url} />
                        </div>

                        <div className='col-span-1'>
                            {/* username avatar */}
                            <div className='flex items-center justify-between px-4 py-4 border-b-2'>
                                <div className='flex flex-row items-center '>
                                    <img className='object-cover w-10 h-10 rounded-full' src={user.avatar_url} />
                                    <p className='pl-4 font-bold text-md'>{user.username}</p>
                                </div>

                                <div>
                                    <DotsHorizontalIcon onClick={() => {
                                        setDeletePopUp(true)
                                    }} className='h-5 cursor-pointer' />
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
                                        <button onClick={() => setShowComment(true)} className='font-semibold text-blue-400'>Post</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>)
            : null
    )

    const popUp = (
        (deletePopUp)
            ? (<div className='flex justify-center items-center top-0 left-0 fixed w-full h-screen bg-black-rgba2 z-50'>
                <XIcon className='text-white cursor-pointer font-bold top-0 right-0 absolute pb-5 w-10 h-10 -translate-x-3 translate-y-5' onClick={() => setDeletePopUp(false)} />


                <div className='cursor-pointer rounded-xl relative w-full max-w-[400px] h-[100px] bg-white flex flex-col place-content-center'>
                    <button onClick={(post) => { handleDeletePost(post) }}>
                        <div className='border-b-2 w-full h-10 pb-2 mb-2 translate-y-2'>
                            <p className='text-md font-semibold text-center'>Delete Post</p>
                        </div>
                    </button>
                    <button onClick={() => setDeletePopUp(false)} >
                        <div className='border-none w-full h-10 mb-2 translate-y-2'>
                            <p className='text-md font-semibold text-center'>Cancel</p>
                        </div>
                    </button>
                </div>
            </div>)
            : ""
    )

    return (
        <div className='bg-gray-50 w-screen h-full '>
            <div className='p-10 max-w-5xl mx-auto'>
                <div className='grid grid-cols-4 gap-4 border-b-2 pb-8'>
                    <div className='avatar justify-center'>
                        <div className='w-40 h-40 rounded-full'>
                            <img className=' object-cover' src={user.avatar_url} />
                        </div>
                    </div>
                    <div className='col-span-3 ml-10'>
                        <span className='text-4xl mr-4 font-extralight tracking-wider'>{user.username}</span>
                        <div className='cursor-pointer inline text-sm text-gray-700 font-semibold p-1 px-2 border border-gray-200 rounded mr-4' onClick={() => {
                            // setUserId(userId)
                            // console.log(userId)
                            setButtonPopup(!buttonPopup)
                        }}>Edit Profile</div>

                        <div className='flex my-4'>
                            <div><span className='font-semibold'>{user.post_count}</span> posts</div>
                            <div className='ml-4'><span className='font-semibold'>{user.follower_count}</span> followers</div>
                            <div className='ml-4'><span className='font-semibold'>{user.following_count}</span> following</div>
                        </div>
                        <div><p>{user.bio}</p></div>
                    </div>
                </div>

                <div className='pt-8 grid grid-cols-3 gap-7'>
                    {postArr.map((img) => {
                        return (
                            <div onClick={() => {
                                setOnePost(img)
                                setPostButtonPopUp(true)
                            }} className=' cursor-pointer overflow-hidden aspect-square'>
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
                {editPopUp}

                {postPopUp}

                {popUp}

                <Modal updatePosts={updatePosts} user={user} />
            </div>
        </div>
    )
}

export default Profile