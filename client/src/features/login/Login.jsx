import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link, useNavigate } from 'react-router-dom';
import { userSliceActions } from '../../store/user-slice';
import { viewUserProfileSliceActions } from '../../store/view-user-profile';

import { getUsers } from '../../services/common/database-communication/firebase-api';

import FormCustomField from '../../components/fields/FormCustomField';

import './Login.css';

import CustomButton from '../../components/buttons/CustomButton';
import Header from '../header/Header';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const Login = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitleIcon, setDialogTitleIcon] = useState();
  const [dialogMessage, setDialogMessage] = useState();
  const [users, setUsers] = useState();
  const [allUsers, setAllusers] = useState([]);

  useEffect(async () => {
    setAllusers(await getUsers());
  }, []);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  const onSubmit = (data) => {
    let i = 0;
    while (i < users.length) {
      if (data.username === users[i].username) {
        if (
          users[i].username === data.username &&
          users[i].password === data.password
        ) {
          if (!users[i].blocked) {
            dispatch(
              userSliceActions.setActiveUserInformation({
                id: users[i].id,
                firstname: users[i].firstname,
                lastname: users[i].lastname,
                username: users[i].username,
                email: users[i].email,
                birthdate: users[i].birthdate.toDate().toString(),
                registerdate: users[i].registerdate.toDate().toString(),
                role: users[i].role,
                status: 'on',
                numberOfPublications: users[i].numberOfPublications,
                numberOfReactions: users[i].numberOfReactions,
                numberOfComments: users[i].numberOfComments,
              }),
            );
            // TODO See do i need to dispatch user info for profile view right on login
            dispatch(
              viewUserProfileSliceActions.setUserProfileInformation({
                firstname: users[i].firstname,
                lastname: users[i].lastname,
                username: users[i].username,
                email: users[i].email,
                birthdate: users[i].birthdate.toDate().toString(),
                role: users[i].role,
                numberOfPublications: users[i].numberOfPublications,
                numberOfReactions: users[i].numberOfReactions,
                numberOfComments: users[i].numberOfComments,
              }),
            );
            if (users[i].role === 'User')
              navigate(`/home/${users[i].username}`);
            else navigate(`/adminpanel/${users[i].username}`);
            break;
          }
          if (users[i].blocked) {
            setDialogTitleIcon(
              <SentimentVeryDissatisfiedIcon
                sx={{
                  borderRadius: 100,
                  height: 34,
                  width: 34,
                  color: 'red',
                }}
              />,
            );
            setDialogMessage(
              'Sorry, your profile is blocked. Contact the admin!',
            );
            setOpenDialog(true);
          }
          break;
        } else {
          setDialogTitleIcon(
            <QuestionMarkIcon
              sx={{
                backgroundColor: '#00b960',
                borderRadius: 100,
                height: 34,
                width: 34,
                color: 'white',
              }}
            />,
          );
          setDialogMessage('Username and password do not match!');
          setOpenDialog(true);
          break;
        }
      }
      if (i + 1 === users.length) {
        setDialogTitleIcon(
          <QuestionMarkIcon
            sx={{
              backgroundColor: '#00b960',
              borderRadius: 100,
              height: 34,
              width: 34,
              color: 'white',
            }}
          />,
        );
        setDialogMessage(
          'User with this username does not exist. Please register first!',
        );
        setOpenDialog(true);
        break;
      }
      i += 1;
    }
  };

  return (
    <div className="user-inputs-login">
      <div className="login-input">
        <div>
          <Header />
        </div>
        <div>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input">
              <div className="login-header">
                <p>Log in to your account</p>
              </div>
              <div className="login-input-data">
                <div className="login-username-input">
                  <FormCustomField
                    name="username"
                    control={control}
                    label="Username"
                    width="470px"
                    typeOfField="text"
                    inputLabelColor="white"
                  />
                </div>
                <div className="login-password-input">
                  <FormCustomField
                    name="password"
                    control={control}
                    label="Password"
                    width="470px"
                    typeOfField="password"
                    inputLabelColor="white"
                  />
                </div>
                <div className="login-input-forgot-password">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="login-input-login-button">
                  <CustomButton
                    buttonName="Log In"
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
                  <div className="horizontal-line">
                    <hr />
                  </div>
                  <div className="login-input-register">
                    <p className="login-input-register-question">
                      Don&apos;t have an account?
                    </p>
                    <Link to="/register" className="login-input-register-link">
                      Register!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <CustomAlertDialog
              open={openDialog}
              setOpen={setOpenDialog}
              dialogTitleIcon={dialogTitleIcon}
              dialogMessage={dialogMessage}
              buttons={[
                <CustomButton
                  buttonName="I understand"
                  typeOfButton="button"
                  variant="contained"
                  buttonWidth="160px"
                  buttonHeight="56px"
                  buttonRadius="100px"
                  buttonFontSize="16px"
                  buttonBackgroundColor="#00B960"
                  buttonColor="white"
                  buttonColorOnHover="#00B960"
                  buttonBackgroundColorOnHover="white"
                  onClick={() => setOpenDialog(false)}
                />,
              ]}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
