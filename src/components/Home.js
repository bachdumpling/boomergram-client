import React, { useEffect, useState } from 'react'
import Feed from './Feed'

function Home({ user, posts, handleLogout, getData, updatePosts, removePosts }) {

    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scroll-bar-hide">
            <div>
                {/* Feed */}
                <Feed updatePosts={updatePosts} removePosts={removePosts} posts={posts} getData={getData} handleLogout={handleLogout} user={user} />

            </div>

        </div>
    )
}

export default Home