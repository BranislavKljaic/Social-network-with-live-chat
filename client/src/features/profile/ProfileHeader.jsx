import React from 'react';
import Box from '@mui/material/Box';
import AvatarImage from '../image/AvatarImage';
import profileHeaderImage from '../../shared/profile-header.png';
import profileAvatarImage from '../../shared/profile-avatar.png';

import './ProfileHeader.css';

const ProfileHeader = (props) => {
  const { user } = props;

  return (
    <div>
      <div className="profile-header-image">
        <Box
          component="img"
          sx={{
            height: 297,
            width: 908,
            borderRadius: 6,
          }}
          src={profileHeaderImage}
        />
      </div>
      <div className="profile-avatar">
        <div className="profile-avatar-image">
          <AvatarImage
            imgHeight={188}
            imgWidth={188}
            imgBorderRadius={100}
            image={profileAvatarImage}
          />
        </div>
        <div className="profile-username">
          <h1>{`${user.firstname} ${user.lastname}`}</h1>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <h4>@{user.username}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
