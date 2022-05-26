import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/buttons/CustomButton';

import db from '../../firebase-config';

import postImg from '../../shared/post.png';
import profileAvatarImage from '../../shared/profile-avatar.png';
import Header from '../header/Header';
import './ViewPost.css';
import { userSliceActions } from '../../store/user-slice';
import { viewUserProfileSliceActions } from '../../store/view-user-profile';
import AvatarImage from '../image/AvatarImage';
import { getUsers } from '../../services/common/database-communication/firebase-api';

const ViewPost = () => {
  const postView = useSelector((state) => state.postView);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [postFromDatabase, setPostFromDatabase] = useState(undefined);
  const [postComments, setPostComments] = useState(undefined);
  const [postLikes, setPostLikes] = useState(undefined);
  const [postDislikes, setPostDislikes] = useState(undefined);
  const [isNewCommentAdded, setIsNewCommentAdded] = useState(false);
  const [users, setUsers] = useState();

  const [isReactionChanged, setIsReactionChanged] = useState(false);
  const [postIsLikedColor, setPostIsLikedColor] = useState('gray');
  const [postIsDislikedColor, setPostIsDislikedColor] = useState('gray');

  useEffect(async () => {
    setUsers(await getUsers());

    const docRef = doc(db, 'posts', postView.id);
    setPostFromDatabase(await getDoc(docRef));

    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, [isNewCommentAdded, isReactionChanged]);

  useEffect(() => {
    if (postFromDatabase !== undefined) {
      setPostComments(postFromDatabase.data().comments);
      setPostLikes(postFromDatabase.data().likes);
      setPostDislikes(postFromDatabase.data().dislikes);
    }
  }, [postFromDatabase, isNewCommentAdded]);

  useEffect(() => {
    if (postLikes !== undefined) {
      postLikes.forEach((postLike) => {
        if (postLike.likeOwnerId === user.id) {
          setPostIsLikedColor('#00b960');
        }
      });
    }

    if (postDislikes !== undefined) {
      postDislikes.forEach((postDislike) => {
        if (postDislike.dislikeOwnerId === user.id) {
          setPostIsDislikedColor('#00b960');
        }
      });
    }
  }, [postLikes, postDislikes]);

  const publishComment = async () => {
    const postDoc = doc(db, 'posts', postView.id);
    const newValueOfComments = {
      comments: arrayUnion({
        commentDate: Timestamp.fromDate(new Date()),
        commentOwner: user.username,
        commentValue: comment,
      }),
    };
    await updateDoc(postDoc, newValueOfComments);

    if (!isNewCommentAdded) setIsNewCommentAdded(true);
    else setIsNewCommentAdded(false);

    setComment('');

    const userDoc = doc(db, 'users', user.id);
    const newValueOfNumberOfComments = {
      numberOfComments: +(user.numberOfComments + 1),
    };
    await updateDoc(userDoc, newValueOfNumberOfComments);

    dispatch(userSliceActions.increaseNumberOfComments());
  };

  const viewUserProfileOnAvatarClick = (profileUsername) => {
    users.forEach((oneUser) => {
      if (profileUsername === oneUser.username) {
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

    navigate(`/profile/${profileUsername}`);
  };

  const changeIsReactionChangedState = () => {
    if (!isReactionChanged) setIsReactionChanged(true);
    else setIsReactionChanged(false);
  };

  const increaseLikesValueInDatabase = async (postDoc) => {
    const newValueOfLikes = {
      likes: arrayUnion({
        likeOwnerId: user.id,
      }),
    };
    await updateDoc(postDoc, newValueOfLikes);

    changeIsReactionChangedState();
  };

  const increaseDislikesValueInDatabase = async (postDoc) => {
    const newValueOfDislikes = {
      dislikes: arrayUnion({
        dislikeOwnerId: user.id,
      }),
    };

    await updateDoc(postDoc, newValueOfDislikes);

    changeIsReactionChangedState();
  };

  const decreaseLikesValueInDatabase = async (postDoc) => {
    const newPostLikes = postLikes.filter(
      (oneLike) => oneLike.likeOwnerId !== user.id,
    );
    await updateDoc(postDoc, {
      likes: newPostLikes,
    });

    changeIsReactionChangedState();
  };

  const decreaseDislikesValueInDatabase = async (postDoc) => {
    const newPostDislikes = postDislikes.filter(
      (oneDislike) => oneDislike.dislikeOwnerId !== user.id,
    );
    await updateDoc(postDoc, {
      dislikes: newPostDislikes,
    });

    changeIsReactionChangedState();
  };

  const increaseUserNumberOfReactions = async () => {
    dispatch(userSliceActions.increaseNumberOfReactions());

    const userDoc = doc(db, 'users', user.id);

    await updateDoc(userDoc, {
      numberOfReactions: +(user.numberOfReactions + 1),
    });
  };

  const decreaseUserNumberOfReactions = async () => {
    dispatch(userSliceActions.decreaseNumberOfReactions());

    const userDoc = doc(db, 'users', user.id);

    await updateDoc(userDoc, {
      numberOfReactions: +(user.numberOfReactions - 1),
    });
  };

  const onLikeClickHandler = async () => {
    const postDoc = doc(db, 'posts', postView.id);

    if (postIsLikedColor === 'gray') {
      setPostIsLikedColor('#00b960');
      if (postIsDislikedColor === '#00b960') {
        setPostIsDislikedColor('gray');

        decreaseDislikesValueInDatabase(postDoc);

        increaseLikesValueInDatabase(postDoc);

        decreaseUserNumberOfReactions();
      }

      increaseLikesValueInDatabase(postDoc);

      increaseUserNumberOfReactions();
    } else {
      setPostIsLikedColor('gray');

      decreaseLikesValueInDatabase(postDoc);

      decreaseUserNumberOfReactions();
    }
  };

  const onDislikeClickHandler = async () => {
    const postDoc = doc(db, 'posts', postView.id);

    if (postIsDislikedColor === 'gray') {
      setPostIsDislikedColor('#00b960');
      if (postIsLikedColor === '#00b960') {
        setPostIsLikedColor('gray');

        decreaseLikesValueInDatabase(postDoc);

        increaseDislikesValueInDatabase(postDoc);

        decreaseUserNumberOfReactions();
      }

      increaseDislikesValueInDatabase(postDoc);

      increaseUserNumberOfReactions();
    } else {
      setPostIsDislikedColor('gray');

      decreaseDislikesValueInDatabase(postDoc);

      decreaseUserNumberOfReactions();
    }
  };

  return (
    <div>
      <div className="one-post-header">
        <Header />
      </div>
      <div className="one-post-view">
        <div className="one-post-image">
          <div className="one-post-tag">
            {postView.tags.map((tag) => (
              <Card key={Math.random()}>
                <Typography variant="h5">{tag}</Typography>
              </Card>
            ))}
          </div>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              sx={{
                height: 724,
                width: 858,
                borderRadius: 6,
              }}
              image={postImg}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 60,
                borderBottomLeftRadius: 22,
                borderBottomRightRadius: 22,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
              }}
            >
              <div className="view-post-information-on-image">
                <div className="view-post-reactions-on-image">
                  <ThumbUpIcon
                    sx={{
                      color: postIsLikedColor,
                      ':hover': { color: '#00b960' },
                    }}
                    onClick={onLikeClickHandler}
                  />
                  <Typography
                    sx={{
                      color: 'gray',
                      fontWeight: 'medium',
                      marginLeft: 1,
                    }}
                    variant="regular"
                  >
                    {postLikes !== undefined ? postLikes.length : <div />}
                  </Typography>
                  <ThumbDownIcon
                    sx={{
                      color: postIsDislikedColor,
                      ':hover': { color: '#00b960' },
                    }}
                    onClick={onDislikeClickHandler}
                  />
                  <Typography
                    sx={{
                      color: 'gray',
                      fontWeight: 'medium',
                      marginLeft: 1,
                    }}
                    variant="regular"
                  >
                    {postDislikes !== undefined ? postDislikes.length : <div />}
                  </Typography>
                  <ChatBubbleIcon
                    sx={{ color: 'gray', ':hover': { color: '#00b960' } }}
                  />
                  <Typography
                    sx={{
                      color: 'gray',
                      fontWeight: 'medium',
                      marginLeft: 1,
                    }}
                    variant="regular"
                  >
                    {postComments !== undefined ? postComments.length : <div />}
                  </Typography>
                </div>
                <div className="view-post-place-on-image">
                  <Typography variant="h6">
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    {postView.accesibillity}({postView.type})
                  </Typography>
                </div>
              </div>
            </Box>
          </Box>
        </div>
        <div className="one-post-description">
          <Card sx={{ width: 414 }}>
            <CardContent>
              <div className="one-post-description-owner">
                <AvatarImage
                  imgHeight={64}
                  imgWidth={64}
                  imgBorderRadius={100}
                  image={profileAvatarImage}
                  onClick={() => viewUserProfileOnAvatarClick(postView.owner)}
                />
                <div style={{ marginLeft: 10 }}>
                  <Typography variant="h5">{postView.owner}</Typography>
                  <Typography>{moment(postView.date).format('l')}</Typography>
                </div>
              </div>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  paddingBottom: 3,
                }}
                gutterBottom
              >
                {postView.description}
              </Typography>
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  height: 25,
                  borderRadius: 16,
                }}
              >
                <div className="post-reactions-icons-like">
                  <ThumbUpIcon
                    sx={{
                      color: postIsLikedColor,
                      ':hover': { color: '#00b960' },
                    }}
                    onClick={onLikeClickHandler}
                  />
                  <Typography
                    sx={{
                      color: 'gray',
                      fontWeight: 'medium',
                      marginLeft: 1,
                    }}
                    variant="regular"
                  >
                    {postLikes !== undefined ? postLikes.length : <div />}
                  </Typography>
                </div>
                <div className="post-reactions-icons-dislike">
                  <ThumbDownIcon
                    sx={{
                      color: postIsDislikedColor,
                      ':hover': { color: '#00b960' },
                    }}
                    onClick={onDislikeClickHandler}
                  />
                  <Typography
                    sx={{
                      color: 'gray',
                      fontWeight: 'medium',
                      marginLeft: 1,
                    }}
                    variant="regular"
                  >
                    {postDislikes !== undefined ? postDislikes.length : <div />}
                  </Typography>
                </div>
                <div className="post-reactions-icons-comment">
                  <ChatBubbleIcon
                    sx={{ color: 'gray', ':hover': { color: '#00b960' } }}
                  />
                  <Typography
                    sx={{
                      color: 'gray',
                      fontWeight: 'medium',
                      marginLeft: 1,
                    }}
                    variant="regular"
                  >
                    {postComments !== undefined ? postComments.length : <div />}
                  </Typography>
                </div>
              </Card>
              <Card sx={{ marginTop: 6 }}>
                <div className="view-post-leave-comment">
                  <div className="view-post-leave-comment-avatar">
                    <Box
                      component="img"
                      sx={{
                        height: 48,
                        width: 48,
                        borderRadius: 100,
                      }}
                      src={profileAvatarImage}
                    />
                  </div>
                  <TextField
                    multiline
                    value={comment}
                    rows={4}
                    placeholder="Write a comment..."
                    variant="standard"
                    sx={{ width: '100%', border: 0 }}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="view-post-publish-comment">
                  <CustomButton
                    buttonName="Publish"
                    typeOfButton="button"
                    variant="contained"
                    buttonWidth="118px"
                    buttonHeight="56px"
                    buttonRadius="100px"
                    buttonMarginTop="10px"
                    buttonMarginBottom="10px"
                    buttonMarginRight="10px"
                    buttonFontSize="16px"
                    buttonBackgroundColor="#00B960"
                    buttonColor="white"
                    buttonColorOnHover="#00B960"
                    buttonBackgroundColorOnHover="white"
                    onClick={publishComment}
                  />
                </div>
              </Card>
            </CardContent>
            <div className="view-post-comments">
              <Card sx={{ width: 378 }}>
                <CardContent>
                  {postComments?.map((postComment) => (
                    <div className="view-post-comment" key={Math.random()}>
                      <div className="view-post-comment-owner">
                        <div className="view-post-comment-owner-avatar">
                          <AvatarImage
                            imgHeight={48}
                            imgWidth={48}
                            imgBorderRadius={100}
                            image={profileAvatarImage}
                            onClick={
                              () =>
                                // eslint-disable-next-line implicit-arrow-linebreak
                                viewUserProfileOnAvatarClick(
                                  postComment.commentOwner,
                                )
                              // eslint-disable-next-line react/jsx-curly-newline
                            }
                          />
                        </div>
                        <div className="view-post-comment-owner-information">
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                            }}
                            variant="h5"
                          >
                            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                            @{postComment.commentOwner}
                          </Typography>
                          <Typography variant="medium">
                            {moment(postComment.commentDate).format('l')}
                          </Typography>
                        </div>
                      </div>
                      <div className="view-post-comment-owner-text">
                        <p>{postComment.commentValue}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
