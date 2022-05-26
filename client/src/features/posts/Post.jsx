import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { viewUserProfileSliceActions } from '../../store/view-user-profile';
import { postViewSliceActions } from '../../store/view-post';
import profileAvatarImage from '../../shared/profile-avatar.png';
import postImg from '../../shared/post.png';

import { getUsers } from '../../services/common/database-communication/firebase-api';

import './Post.css';

const Post = (props) => {
  const { post } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(async () => async () => setUsers(await getUsers()), []);

  const viewUserProfileOnAvatarClick = () => {
    users.forEach((oneUser) => {
      if (post.owner === oneUser.username) {
        dispatch(
          viewUserProfileSliceActions.setUserProfileInformation({
            firstname: oneUser.firstname,
            lastname: oneUser.lastname,
            username: oneUser.username,
            email: oneUser.email,
            birthdate: oneUser.birthdate.toDate().toString(),
            role: oneUser.role,
            numberOfPublications: oneUser.numberOfPublications,
            numberOfReactions: oneUser.numberOfReactions,
            numberOfComments: oneUser.numberOfComments,
          }),
        );
      }
    });

    navigate(`/profile/${post.owner}`);
  };

  const viewPostOnImageClick = () => {
    users.forEach((oneUser) => {
      if (post.owner === oneUser.username) {
        dispatch(
          postViewSliceActions.setViewPostInformation({
            id: post.id,
            owner: post.owner,
            tags: post.tags,
            accesibillity: post.accesibillity,
            date: post.date.toString(),
            description: post.description,
            name: post.name,
            comments: post.comments,
            dislikes: post.dislikes,
            likes: post.likes,
            place: post.place,
            type: post.type,
          }),
        );
      }
    });

    navigate('/viewpost');
  };

  return (
    <div className="one-post">
      {post.owner !== undefined ? (
        <Card sx={{ width: 908, height: 878 }}>
          <div className="post-owner">
            <Box
              component="img"
              sx={{
                height: 64,
                width: 64,
                borderRadius: 100,
              }}
              src={profileAvatarImage}
              onClick={viewUserProfileOnAvatarClick}
            />
            <div className="post-information">
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {post.owner}
              </Typography>
              <div className="post-tags">
                {post.tags !== undefined ? (
                  post.tags.map((tag) => (
                    <Card key={Math.random()}>
                      <Typography variant="h5" key={Math.random()}>
                        {tag}
                      </Typography>
                    </Card>
                  ))
                ) : (
                  <div />
                )}
              </div>
              <Typography variant="secondary">
                {moment(post.date).format('l')}
              </Typography>
            </div>
          </div>
          <div className="post-image-and-description">
            <div className="post-description">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {post.description}
              </Typography>
            </div>
            <div className="post-image">
              <Box
                component="img"
                sx={{
                  height: 584,
                  width: 844,
                  borderRadius: 6,
                }}
                src={postImg}
                onClick={viewPostOnImageClick}
              />
            </div>
          </div>
          <div className="post-reactions">
            <div className="post-reactions-icons">
              <div className="post-reactions-icons-like">
                <ThumbUpIcon
                  sx={{ color: 'gray', ':hover': { color: '#00b960' } }}
                />
                <Typography
                  sx={{ color: 'gray', fontWeight: 'medium', marginLeft: 1 }}
                  variant="regular"
                >
                  {post.likes}
                </Typography>
              </div>
              <div className="post-reactions-icons-dislike">
                <ThumbDownIcon
                  sx={{ color: 'gray', ':hover': { color: '#00b960' } }}
                />
                <Typography
                  sx={{ color: 'gray', fontWeight: 'medium', marginLeft: 1 }}
                  variant="regular"
                >
                  {post.dislikes}
                </Typography>
              </div>
              <div className="post-reactions-icons-comment">
                <ChatBubbleIcon
                  sx={{ color: 'gray', ':hover': { color: '#00b960' } }}
                />
                <Typography
                  sx={{ color: 'gray', fontWeight: 'medium', marginLeft: 1 }}
                  variant="regular"
                >
                  {post.comments}
                </Typography>
              </div>
            </div>
            <div className="post-reactions-desc">
              <Typography
                variant="h6"
                sx={{ fontWeight: 'regular', display: 'flex' }}
              >
                <div>{post.accesibillity}</div>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <div>({post.type})</div>
              </Typography>
            </div>
          </div>
        </Card>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Post;
