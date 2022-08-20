import React from 'react'
import PostCard from './PostCard';

function Post({ posts, user, getData }) {

    return (
        <>
            {posts.length > 0
                ?
                (<div>
                    {posts.map((post) => {
                        return (
                            <PostCard user={user} getData={getData} post={post} key={post.id} />
                        )
                    })}
                </div>)
                :
                (<div className='h-96 grid place-items-center '>
                    <p className='text-lg text-gray-500'>No post to show</p>
                </div>)
            }

        </>
    )
}

export default Post