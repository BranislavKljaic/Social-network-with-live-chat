import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../header/Header';
import ProfileInformation from './ProfileInformation';
import ProfileHeader from './ProfileHeader';
import Post from '../posts/Post';

import './Profile.css';

const Profile = () => {
  const user = useSelector((state) => state.userProfile);
  const posts = useSelector((state) => state.posts);

  return (
    <div className="profile-container">
      <div>
        <Header />
      </div>
      <div className="main-profile-container">
        <div className="profile-header-container">
          <ProfileHeader user={user} />
        </div>
        <div className="profile-content">
          <ProfileInformation user={user} />
          {posts.map((post) => (
            post.owner === user.username ? (
              <Post post={post} key={post.id} />
            ) : (
              <div key={post.id} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
