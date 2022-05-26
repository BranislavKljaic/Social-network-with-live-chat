import React from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Card from '@mui/material/Card';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import FormCustomField from '../../components/fields/FormCustomField';
import CustomButton from '../../components/buttons/CustomButton';
import { userSliceActions } from '../../store/user-slice';
import { postsSliceActions } from '../../store/posts-slice';

import createPostImg from '../../shared/create-post.png';

import db from '../../firebase-config';

import './NewPost.css';
import Header from '../header/Header';
import FormCustomSelector from '../../components/fields/FormCustomSelector';
import { newPostAccesibillities, newPostTypes } from '../../shared/Helpers';

const NewPost = () => {
  const postsCollectionReference = collection(db, 'posts');
  const { control, handleSubmit } = useForm();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await addDoc(postsCollectionReference, {
      owner: user.username,
      name: data.name,
      place: data.place,
      accesibillity: data.accesibillity,
      type: data.type,
      description: data.description,
      date: Timestamp.fromDate(new Date()),
      comments: [],
      dislikes: [],
      likes: [],
      tags: ['Default tag 1', 'Default tag 2'],
    });

    const userDoc = doc(db, 'users', user.id);
    const newValueOfPublications = {
      numberOfPublications: +(user.numberOfPublications + 1),
    };
    await updateDoc(userDoc, newValueOfPublications);

    dispatch(userSliceActions.increaseNumberOfPublications());
    dispatch(
      postsSliceActions.putPostOnList({
        name: data.name,
        date: data.date,
        accesibillity: data.accesibillity,
        description: data.description,
        owner: data.owner,
        place: data.place,
        tags: data.tags,
        type: data.type,
      }),
    );

    navigate(`/home/${user.username}`);
  };

  const clearCreateNewPostFields = () => {
    // console.log(openDialog);
    // TODO: Make a function to clear all input fields
  };

  return (
    <div className="new-post-main-container">
      <div>
        <Header />
      </div>
      <div className="new-post-add-new-post-container">
        <div className="new-post-add-new-post">
          <div className="new-post-image">
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                sx={{
                  height: 582,
                  width: 648,
                  borderRadius: 6,
                }}
                image={createPostImg}
              />
              <div className="new-post-image-text">
                <Box
                  sx={{
                    position: 'absolute',
                    top: 170,
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <Typography sx={{ fontSize: 96 }}>NEW POST</Typography>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ArrowForwardIcon sx={{ width: 150, height: 120 }} />
                  </div>
                </Box>
              </div>
            </Box>
          </div>
          <div>
            <Card sx={{ width: 589, height: 582, borderRadius: 6 }}>
              <form
                className="new-post-inputs"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="new-post-input">
                  <FormCustomField
                    name="name"
                    control={control}
                    label="Name"
                    width="470px"
                    typeOfField="text"
                    inputLabelColor="black"
                  />
                </div>
                <div className="new-post-input">
                  <FormCustomField
                    name="place"
                    control={control}
                    label="Place"
                    width="470px"
                    typeOfField="text"
                    inputLabelColor="black"
                  />
                </div>
                <div className="new-post-input">
                  <FormCustomSelector
                    name="accesibillity"
                    control={control}
                    label="Accesibillity"
                    width="470px"
                    items={newPostAccesibillities}
                    selectorIcon={<ArrowDropDownIcon />}
                  />
                </div>
                <div className="new-post-input">
                  <FormCustomSelector
                    name="type"
                    control={control}
                    label="Type"
                    width="470px"
                    items={newPostTypes}
                    selectorIcon={<ArrowDropDownIcon />}
                  />
                </div>
                <div className="new-post-input">
                  <FormCustomField
                    name="description"
                    control={control}
                    label="Add description..."
                    width="470px"
                    typeOfField="text"
                    inputLabelColor="black"
                  />
                </div>
                <div className="new-post-buttons">
                  <div>
                    <CustomButton
                      buttonName="Publish"
                      typeOfButton="submit"
                      variant="contained"
                      buttonWidth="470px"
                      buttonHeight="56px"
                      buttonRadius="100px"
                      buttonMarginTop="50px"
                      buttonFontSize="16px"
                      buttonBackgroundColor="#00B960"
                      buttonColor="white"
                      buttonColorOnHover="#00B960"
                      buttonBackgroundColorOnHover="white"
                    />
                  </div>
                  <div>
                    <CustomButton
                      buttonName="Discard"
                      typeOfButton="button"
                      variant="contained"
                      buttonWidth="470px"
                      buttonHeight="56px"
                      buttonRadius="100px"
                      buttonMarginTop="25px"
                      buttonFontSize="16px"
                      buttonBackgroundColor="#EAEAF5"
                      buttonColor="#161616"
                      buttonColorOnHover="#474747"
                      buttonBackgroundColorOnHover="white"
                      onClick={clearCreateNewPostFields}
                    />
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
