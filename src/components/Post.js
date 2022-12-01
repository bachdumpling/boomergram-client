import React from 'react'
import PostCard from './PostCard';

function Post({ posts, user, getData, removePosts }) {

    return (
        <>
            {posts.length > 0
                ?
                (<div>
                    {posts.map((post) => {
                        return (
                            <PostCard removePosts={removePosts} user={user} userId={post.user.id} getData={getData} post={post} key={post.id} />
                        )
                    })}
                </div>)
                :
                (<div className='h-96 grid place-items-center '>
                    <p className='text-xl text-gray-500'>No post to show</p>
                </div>)
            }

        </>
    )
}

export default Post