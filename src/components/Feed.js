import React, { useEffect, useState } from 'react'
import MiniProfile from './MiniProfile'
import Modal from './Modal'
import Post from './Post'
import Story from './Story'
// import Suggestion from './Suggestion'

function Feed({user}) {
    const [posts, setPosts] = useState([])

    function getData() {
        fetch('/feed')
            .then(r => r.json())
            .then(r => {
                if (r.length > 0) {
                    setPosts(r)
                }
            })
    }

    function updatePosts(post){
        setPosts([post, ...posts])
    }

    useEffect(()=>{
        getData()
    },[])

    // console.log(posts)
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-3xl mx-auto'>
            {/* Section */}
            <section className='col-span-2 pb-20'>
                {/* Stories */}
                {/* <Story /> */}

                {/* Post */}
                <Post getData={getData} posts={posts} user={user} />
            </section>

            <section className='hidden xl:inline-grid md:col-span-1'>
                {/* Section */}
                <div className='fixed top-20'>
                    {/* Mini profile */}
                    <MiniProfile user={user} />
                    {/* Suggestion */}
                    {/* <Suggestion /> */}
                </div>
            </section>

            <Modal user={user} updatePosts={updatePosts}/>
        </main>
    )
}

export default Feed