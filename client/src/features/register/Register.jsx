import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

import db from '../../firebase-config';

import FormCustomField from '../../components/fields/FormCustomField';
import FormCustomRadioButton from '../../components/radio/FormCustomRadioButton';
import CustomButton from '../../components/buttons/CustomButton';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

import './Register.css';

import Header from '../header/Header';
import { socialNetworkRoles } from '../../shared/Helpers';

const Register = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userAlreadyExistFlag, setUserAlreadyExistFlag] = useState(0);
  const usersCollectionReference = collection(db, 'users');
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionReference);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [users]);

  const registerOnSubmit = async (data) => {
    users.forEach((user) => {
      if (user.username === data.username) {
        setOpenDialog(true);
        setUserAlreadyExistFlag(1);
      }
    });
    if (!userAlreadyExistFlag) {
      await addDoc(usersCollectionReference, {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
        email: data.email,
        birthdate: Timestamp.fromDate(new Date(data.dateofbirth)),
        registerdate: Timestamp.fromDate(new Date()),
        role: data.role === '1' ? 'User' : 'Admin',
        status: 'off',
        blocked: false,
        numberOfPublications: 0,
        numberOfReactions: 0,
        numberOfComments: 0,
      });
      navigate('/');
    }
  };

  return (
    <div className="user-inputs-register">
      <div>
        <Header />
      </div>
      <form className="register-form" onSubmit={handleSubmit(registerOnSubmit)}>
        <div className="register-input">
          <div className="register-header">
            <p>Create new account.</p>
          </div>
          <div className="register-input-data">
            <div className="register-username-input">
              <FormCustomField
                name="firstname"
                control={control}
                label="First name"
                width="217px"
                typeOfField="text"
                inputLabelColor="white"
              />
              <FormCustomField
                name="lastname"
                control={control}
                label="Last name"
                width="217px"
                typeOfField="text"
                inputLabelColor="white"
              />
            </div>
            <div className="register-username-input">
              <FormCustomField
                name="username"
                control={control}
                label="Username"
                width="470px"
                typeOfField="text"
                inputLabelColor="white"
              />
            </div>
            <div className="register-username-input">
              <FormCustomField
                name="email"
                control={control}
                label="E-mail"
                width="470px"
                typeOfField="text"
                inputLabelColor="white"
              />
            </div>
            <div className="register-username-input">
              <FormCustomField
                name="password"
                control={control}
                label="Password"
                width="470px"
                typeOfField="password"
                inputLabelColor="white"
              />
            </div>
            <div className="register-username-input">
              <FormCustomField
                name="confirmpassword"
                control={control}
                label="Confirm password"
                width="470px"
                typeOfField="password"
                inputLabelColor="white"
              />
            </div>
            <div className="register-username-input">
              <FormCustomField
                name="dateofbirth"
                control={control}
                label="Date of birth"
                width="470px"
                typeOfField="date"
                inputLabelColor="white"
              />
            </div>
            <div className="register-username-input">
              <FormCustomRadioButton
                name="role"
                control={control}
                items={socialNetworkRoles}
              />
            </div>
            <div className="register-input-register-button">
              <CustomButton
                buttonName="Sign Up"
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
                <hr className="horizontal-line" />
              </div>
            </div>
            <div className="register-input-login">
              <p className="register-input-login-question">
                Already have an account?
              </p>
              <Link to="/" className="register-input-login-link">
                Login!
              </Link>
            </div>
          </div>
        </div>
        <CustomAlertDialog
          open={openDialog}
          setOpen={setOpenDialog}
          dialogTitle="Invalid username"
          dialogMessage="Username that you trying to register with is already in use. Please choose another username!"
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
  );
};

export default Register;
