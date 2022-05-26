import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../features/profile/Profile';

const Profilepage = () => {
  const { username } = useParams();
  return <Profile username={username} />;
};

export default Profilepage;
