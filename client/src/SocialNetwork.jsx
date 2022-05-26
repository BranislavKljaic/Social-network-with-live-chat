import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Homepage from './pages/HomePage/Homepage';
import Loginpage from './pages/LoginPage/Loginpage';
import Registerpage from './pages/RegisterPage/Registerpage';
import ForgotPasswordpage from './pages/ForgotPasswordPage/ForgotPasswordpage';
// import Profilepage from './pages/Profilepage/Profilepage';
import ViewPost from './features/posts/ViewPost';
import NewPost from './features/posts/NewPost';
// import AdminPanelpage from './pages/AdminPage/AdminPanelpage';
import Profile from './features/profile/Profile';
import AdminPanel from './features/admin-panel/AdminPanel';

const SocialNetwork = () => {
  const user = useSelector((state) => state.user);
  const isUserLogged = user.username === undefined;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/forgot-password" element={<ForgotPasswordpage />} />
        {/* <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/viewpost" element={<ViewPost />} />
        <Route
          path="/newpost"
          element={<NewPost isUserLogged={isUserLogged} />}
        />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/adminpanel/:username" element={<AdminPanel />} /> */}
        {/* <Route
          path={`/profile/${user.username}`}
          element={isUserLogged ? <Navigate replace to="/" /> : <Profile />}
        /> */}
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path={`/home/${user.username}`}
          element={isUserLogged ? <Navigate replace to="/" /> : <Homepage />}
        />
        <Route path="/viewpost" element={<ViewPost />} />
        {/* <Route
          path={`/viewpost/${user.username}`}
          element={isUserLogged ? <Navigate replace to="/" /> : <ViewPost />}
        /> */}
        <Route
          path={`/newpost/${user.username}`}
          element={isUserLogged ? <Navigate replace to="/" /> : <NewPost />}
        />
        <Route
          path={`/adminpanel/${user.username}`}
          element={
            isUserLogged ? <Navigate replace to="/" /> : <AdminPanel />
          }
        />
      </Routes>
    </div>
  );
};

export default SocialNetwork;
