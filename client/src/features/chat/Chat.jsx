import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import CustomButton from '../../components/buttons/CustomButton';
import AvatarImage from '../image/AvatarImage';
import avatarImg from '../../shared/profile-avatar.png';

import db from '../../firebase-config';
import { getUsers } from '../../services/common/database-communication/firebase-api';

import './Chat.css';

const Chat = (props) => {
  const { socket, otherUserAttendantId } = props;
  const user = useSelector((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const chatsCollectionReference = collection(db, 'chats');
  const [chats, setChats] = useState();
  const [chatHistory, setChatHisotory] = useState(undefined);
  const [chatRoomId, setChatRoomId] = useState();
  const [users, setUsers] = useState();
  const messagesEndRef = useRef(null);
  const [secondUserFirstnameOnChat, setSecondUserFirstnameOnChat] = useState();
  const [secondUserLastnameOnChat, setSecondUserLastnameOnChat] = useState();

  useEffect(async () => {
    setUsers(await getUsers());
  }, []);

  useEffect(() => {
    if (users !== undefined) {
      users.forEach((oneUser) => {
        if (oneUser.id === otherUserAttendantId) {
          // console.log('name:', oneUser.firstname);
          // console.log('id:', oneUser.id);
          setSecondUserFirstnameOnChat(oneUser.firstname);
          setSecondUserLastnameOnChat(oneUser.lastname);
        }
      });
    }
  }, [users]);

  useEffect(() => {
    const getChats = async () => {
      const data = await getDocs(chatsCollectionReference);
      setChats(data.docs.map((docum) => ({ ...docum.data(), id: docum.id })));
    };

    getChats();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(async () => {
    if (chats !== undefined) {
      chats.forEach((chat) => {
        if (
          chat.attendants.includes(user.id) &&
          chat.attendants.includes(otherUserAttendantId)
        ) {
          setHistoryMessages(chat.messages);
          setChatHisotory(chat);
          setChatRoomId(chat.id);
        }
      });
    }

    // eslint-disable-next-line no-undef
    // window.scrollTo(100000000000000000000000000000000, 10000000);
  }, [chats]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on('receive_message', (data) => {
        setMessageList((list) => [...list, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: chatRoomId,
        author: user.firstname,
        message: currentMessage,
      };

      await socket.emit('send_message', messageData);
      setMessageList((prevState) => [...prevState, messageData]);
      setCurrentMessage('');

      if (chatHistory !== undefined) {
        const chatRef = doc(db, 'chats', chatHistory.id);

        await updateDoc(chatRef, {
          messages: arrayUnion({
            messageOwner: user.id,
            messageValue: currentMessage,
          }),
        });
      }
    }
  };

  return (
    <div style={{ height: 450, width: 270 }}>
      <div
        style={{
          height: 35,
          width: '100%',
          background: 'pink',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          top: 0,
          left: 0,
          position: 'relative',
        }}
      >
        <div>{`${secondUserFirstnameOnChat} ${secondUserLastnameOnChat}`}</div>
        <CloseIcon />
      </div>
      <div style={{ height: 375, overflow: 'auto' }}>
        <div>
          <div>
            {historyMessages?.map((messageContent) => (
              <div
                style={{
                  marginLeft: messageContent.messageOwner === user.id ? 15 : 0,
                  marginRight: messageContent.messageOwner === user.id ? 0 : 15,
                  marginBottom: 15,
                  display: 'flex',
                  flexDirection:
                    messageContent.messageOwner === user.id
                      ? 'row-reverse'
                      : 'row',
                  width: 237,
                  // float:
                  //   messageContent.messageOwner === user.id ? 'right' : 'left',
                }}
              >
                <div>
                  <AvatarImage
                    imgHeight={35}
                    imgWidth={35}
                    imgBorderRadius={100}
                    image={avatarImg}
                  />
                </div>
                <div
                  style={{
                    marginLeft: messageContent.messageOwner === user.id ? 0 : 5,
                    marginRight:
                      messageContent.messageOwner === user.id ? 5 : 0,
                    background: '#d3d3d3',
                    borderRadius: '10px',
                  }}
                >
                  <div
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      fontWeight: 'bold',
                    }}
                  >
                    {messageContent.messageOwner !== user.id
                      ? secondUserFirstnameOnChat
                      : user.firstname}
                  </div>
                  <div style={{ marginLeft: 5, marginRight: 5 }}>
                    {messageContent.messageValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {messageList?.map((messageContent) => (
            <div
              style={{
                marginLeft: messageContent.author === user.firstname ? 15 : 0,
                marginRight: messageContent.author === user.firstname ? 0 : 15,
                marginBottom: 15,
                display: 'flex',
                flexDirection:
                  messageContent.author === user.firstname
                    ? 'row-reverse'
                    : 'row',
                width: 237,
                // float:
                //   messageContent.author === user.firstname ? 'left' : 'right',
              }}
            >
              <div>
                <AvatarImage
                  imgHeight={35}
                  imgWidth={35}
                  imgBorderRadius={100}
                  image={avatarImg}
                />
              </div>
              <div
                style={{
                  marginLeft: messageContent.author === user.firstname ? 0 : 5,
                  marginRight: messageContent.author === user.firstname ? 5 : 0,
                  background: '#d3d3d3',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{ marginLeft: 5, marginRight: 5, fontWeight: 'bold' }}
                >
                  {messageContent.author !== user.firstname
                    ? secondUserFirstnameOnChat
                    : user.firstname}
                </div>
                <div style={{ marginLeft: 5, marginRight: 5 }}>
                  {messageContent.message}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
        <div className="send-message">
          <div className="send-message-options">
            <div>
              <TextField
                placeholder="Message..."
                style={{ width: 200 }}
                value={currentMessage}
                size="small"
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </div>
            <div>
              <CustomButton
                buttonName="Send"
                buttonWidth={20}
                buttonHeight={40}
                buttonBackgroundColor="#00b960"
                buttonColor="#fff"
                buttonColorOnHover="#00b960"
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
