import React, { useEffect, useState } from "react";
import MiniProfile from "./MiniProfile";
import Modal from "./Modal";
import Post from "./Post";
import Story from "./Story";
// import Suggestion from './Suggestion'

function Feed({
  user,
  updatePosts,
  getData,
  posts,
  handleLogout,
  removePosts,
}) {
  // console.log(posts)
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-xl xl:grid-cols-3 xl:max-w-2xl mx-auto">
      {/* Section */}
      <section className="col-span-2 pb-20">
        {/* Stories */}
        {/* <Story /> */}

        {/* Post */}
        <Post
          getData={getData}
          posts={posts}
          user={user}
          removePosts={removePosts}
        />
      </section>

      <section className="sm:col-span-1">
        {/* Section */}
        <div className="fixed top-20">
          {/* Mini profile */}
          <MiniProfile user={user} handleLogout={handleLogout} />

          {/* Suggestion */}
          {/* <Suggestion /> */}
        </div>
      </section>

      <Modal user={user} updatePosts={updatePosts} />
    </main>
  );
}

export default Feed;
