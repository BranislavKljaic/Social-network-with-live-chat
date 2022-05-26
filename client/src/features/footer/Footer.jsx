import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { collection, getDocs } from 'firebase/firestore';

import { useSelector } from 'react-redux';
import './Footer.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import CustomButton from '../../components/buttons/CustomButton';
import { getUsers } from '../../services/common/database-communication/firebase-api';
import AvatarImage from '../image/AvatarImage';
import Chat from '../chat/Chat';

import db from '../../firebase-config';

import avatarImg from '../../shared/profile-avatar.png';

const socket = io.connect('http://localhost:5000');

const Footer = () => {
  const test = 'Open messaging';
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [usersFromDatabase, setUsersFromDatabase] = useState();
  const [chatDialogList, setCheckDialogList] = useState([]);
  const chatsCollectionReference = collection(db, 'chats');
  const [chats, setChats] = useState();

  useEffect(async () => {
    setUsersFromDatabase(await getUsers());
  }, []);

  useEffect(() => {
    const getChats = async () => {
      const data = await getDocs(chatsCollectionReference);
      setChats(data.docs.map((docum) => ({ ...docum.data(), id: docum.id })));
    };

    getChats();
  }, []);

  useEffect(async () => {
    if (usersFromDatabase !== undefined) {
      usersFromDatabase.forEach((oneUser) => {
        if (oneUser.id !== user.id && oneUser.role !== 'Admin')
          setUsers((prev) => [...prev, oneUser]);
      });
    }
  }, [usersFromDatabase]);

  const checkIfUserIsInChatList = (username) => {
    let flag = false;
    chatDialogList.forEach((chat) => {
      if (chat.name === username) {
        flag = true;
      }
    });
    return flag;
  };

  const openChatWithChosenUser = (oneUser) => {
    if (!checkIfUserIsInChatList(oneUser.username)) {
      setCheckDialogList((prev) => [
        ...prev,
        {
          id: oneUser.id,
          name: oneUser.firstname,
        },
      ]);
    }

    chats.forEach((chat) => {
      if (
        chat.attendants.includes(user.id) &&
        chat.attendants.includes(oneUser.id)
      ) {
        socket.emit('join_room', chat.id);
      }
    });
  };

  return (
    <div className="footer">
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row-reverse',
          gap: 1,
        }}
      >
        {chatDialogList?.map((chat) => (
          <PopupState>
            {(popupState) => (
              <div>
                <CustomButton
                  {...bindTrigger(popupState)}
                  buttonName={chat.name}
                  buttonWidth={270}
                  buttonHeight={50}
                  buttonBackgroundColor="#00b960"
                  buttonColor="#fff"
                  buttonColorOnHover="#00b960"
                />
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Chat otherUserAttendantId={chat.id} socket={socket} />
                </Popover>
              </div>
            )}
          </PopupState>
        ))}
      </div>
      <div>
        <PopupState>
          {(popupState) => (
            <div>
              <CustomButton
                {...bindTrigger(popupState)}
                buttonName={test}
                buttonWidth={270}
                buttonHeight={50}
                buttonBackgroundColor="#00b960"
                buttonColor="#fff"
                buttonColorOnHover="#00b960"
                buttonMarginLeft={2}
              />
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {users.map((oneUser) => (
                  <List>
                    <ListItem sx={{ width: 270 }} disablePadding>
                      <ListItemButton
                        onClick={() => openChatWithChosenUser(oneUser)}
                      >
                        <AvatarImage
                          imgHeight={40}
                          imgWidth={40}
                          imgBorderRadius={100}
                          imgMarginRight={1}
                          image={avatarImg}
                        />
                        <ListItemText
                          primary={`${oneUser.firstname} ${oneUser.lastname}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))}
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
};

export default Footer;
