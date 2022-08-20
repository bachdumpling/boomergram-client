import Login from "./components/Login";
import "./global.css"
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { RecoilRoot } from "recoil";
import NonUserProfile from "./components/NonUserProfile";
// import NonUserProfile from "./components/NonUserProfile";

function App() {
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

  return (
    <div className="bg-gray-50 text-black">
      <RecoilRoot>
        <Header user={user} />
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home user={user} />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Profile */}
          <Route path="/profile" element={<Profile user={user} />} />

          {/* NonUserProfile */}
          <Route path="/users/:id" element={<NonUserProfile user={user} />} />
        </Routes>

        <Routes>
        </Routes>

      </RecoilRoot>
    </div>
  );
}

export default App;
