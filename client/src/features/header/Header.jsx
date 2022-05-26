import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { userSliceActions } from '../../store/user-slice';

import logo from '../../shared/logo.png';
import CustomButton from '../../components/buttons/CustomButton';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

import './Header.css';

const Header = () => {
  const user = useSelector((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [dialogTitleIcon, setDialogTitleIcon] = useState();

  const logoutUserFromSocialNetwork = () => {
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
    setOpenDialog(true);
  };

  const redirectToHomePage = () => {
    if (user.role === 'User') {
      navigate(`/home/${user.username}`);
    }
  };

  const handleLogOut = () => {
    dispath(userSliceActions.logOffUserFromSocialNetwork());
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <div>
      {user.username !== undefined ? (
        <div className="logged-user-header">
          <div className="logged-user-logo">
            <Box
              className="header-image"
              component="img"
              sx={{
                height: 52,
                width: 123,
              }}
              src={logo}
              onClick={redirectToHomePage}
            />
          </div>
          <div className="logged-user-options">
            {user.role === 'User' ? (
              <CustomButton
                buttonName="Add New"
                typeOfButton="button"
                variant="contained"
                buttonWidth="132px"
                buttonHeight="46px"
                buttonRadius="100px"
                buttonFontSize="16px"
                buttonBackgroundColor="#00B960"
                buttonColor="white"
                buttonColorOnHover="#00B960"
                buttonBackgroundColorOnHover="white"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/newpost/${user.username}`)}
              />
            ) : (
              <div />
            )}
            <div className="logged-user-logout-btn">
              <CustomButton
                buttonName="Log Out"
                typeOfButton="button"
                buttonWidth="132px"
                buttonHeight="46px"
                buttonRadius="100px"
                buttonFontSize="16px"
                buttonBackgroundColor="transparent"
                buttonColor="black"
                buttonColorOnHover="#00B960"
                buttonBackgroundColorOnHover="white"
                startIcon={<LogoutIcon />}
                onClick={logoutUserFromSocialNetwork}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="header">
          <div className="logo">
            <img alt="logo" src={logo} />
          </div>
        </div>
      )}
      <CustomAlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClickAction={handleLogOut}
        dialogTitleIcon={dialogTitleIcon}
        dialogMessage="Are you sure you want to log out?"
        buttons={[
          <CustomButton
            buttonName="Yes"
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
            onClick={handleLogOut}
          />,
          <CustomButton
            buttonName="No"
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
    </div>
  );
};

export default Header;
