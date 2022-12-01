import Login from "./components/Login";
import "./global.css"
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { RecoilRoot } from "recoil";
import NonUserProfile from "./components/NonUserProfile";
// import NonUserProfile from "./components/NonUserProfile";

function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({
    "username": "",
    "bio": "",
    "avatar_url": "",
    "follower_count": "",
    "following_count": "",
    "post_count": "",
    "following_id": [],
    "posts": []
  });

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            // console.log(user)
            setUser(user)
          });
        }
      })
  }, []);

  useEffect(() => {
    getData()
  }, [])

  function getData() {
    fetch('/feed')
      .then(r => r.json())
      .then(r => {
        if (r.length > 0) {
          setPosts(r)
        }
      })
  }

  function updatePosts(post) {
    console.log(post)
    setPosts([post, ...posts])
  }

  function removePosts(post) {
    setPosts(posts.filter((item) => {
      return item.id !== post.id
    }))
  }

  const navigate = useNavigate()

  function handleLogout() {
    fetch(`/logout`, {
      method: "DELETE"
    }).then(
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    )
  }


  return (
    <div className="bg-gray-50 text-black">
      <RecoilRoot>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        {user ?
          <div>
            <Header handleLogout={handleLogout} user={user} />
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home posts={posts} user={user} handleLogout={handleLogout} getData={getData} updatePosts={updatePosts} removePosts={removePosts} />} />

              {/* Profile */}
              <Route path="/profile" element={<Profile getData={getData} updatePosts={updatePosts} user={user} />} />

              {/* NonUserProfile */}
              <Route path="/users/:id" element={<NonUserProfile user={user} />} />
            </Routes>
          </div>
          :
          null
        }


      </RecoilRoot>
    </div>
  );
}

export default App;
