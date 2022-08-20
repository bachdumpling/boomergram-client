import React, { useEffect, useState } from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { HeartIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

function NonUserProfile({ user }) {
    const [nonUserData, setNonUserData] = useState({
        "username": "",
        "bio": "",
        "avatar_url": "",
        "follower_count": "",
        "following_count": "",
        "post_count": "",
        "following_id":[],
        "posts": []
    });

    const { id } = useParams()

    useEffect(() => {
        getData()
    }, [])

    function getData() {
        fetch(`/users/${id}`)
            .then(r => r.json())
            .then(r => {
                console.log(r)
                setNonUserData(r)
            })
    }

    // function matchId() {
    //     if(user.following_id.find(id => id == nonUserData.id))
    // }

    console.log(nonUserData.id)

    function handleUnfollow() {
        fetch(`/unfollow/${nonUserData.id}`,
            { method: 'DELETE' })
            .then(r => r.json())
            .then(getData())
    }

    function handleFollow() {
        fetch('/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                follower_id: user.id, followee_id: nonUserData.id
            })
        })
            .then(r => r.json())
            .then(r => getData())
    }


    return (
        <div className='p-10 max-w-5xl mx-5 xl:mx-auto bg-gray-50 h-screen'>
            <div className='grid grid-cols-4 gap-4 border-b-2 pb-12'>
                <div className='avatar justify-center'>
                    <div className=' w-40 h-40 rounded-full'>
                        <img className=' object-fill' src={nonUserData.avatar_url} />
                    </div>
                </div>
                <div className='col-span-3 ml-10'>
                    <span className='text-4xl mr-4 font-extralight tracking-wider'>{nonUserData.username}</span>
                    {
                        user.following_id.find(id => id == nonUserData.id)
                            ?
                            (<button onClick={() => { handleUnfollow() }}><div className='cursor-pointer inline text-sm text-gray-700 font-semibold p-1 px-2 border border-gray-200 rounded mr-4'>Following</div></button>)
                            :
                            (<button onClick={handleFollow}><div className='cursor-pointer inline text-sm text-white bg-blue-500 font-semibold p-1 px-6 border border-gray-200 rounded mr-4'>Follow</div></button>)}

                    <div className='flex my-4'>
                        <div><span className='font-semibold'>{nonUserData.post_count}</span> posts</div>
                        <div className='ml-4'><span className='font-semibold'>{nonUserData.follower_count}</span> followers</div>
                        <div className='ml-4'><span className='font-semibold'>{nonUserData.following_count}</span> following</div>
                    </div>
                    <div><p>{nonUserData.bio}</p></div>
                </div>
            </div>

            <div className='pt-12 grid grid-cols-3 gap-7'>
                {nonUserData.posts.map((img) => {
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
        </div>
    )
}

export default NonUserProfile