import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@mui/icons-material/Person';
import io from 'socket.io-client';
import { SocketContext } from '../../hook/socket.context';

const useStyles = makeStyles({
  container: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    margin: '2% auto',
  },
  titleBar: {
    backgroundColor: '#6bb9ed',
  },
  titleText: {
    width: '100%',
    // height: ,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // justifyContent: 'space-between',
  },
  inputForm: {
    width: '80%',
    height: '35px',
  },
  button: {
    width: '20%',
    height: '35px',
  },
  chatContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'grey',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '20px',
  },
});

// let socket: any;

const ChatRoom = () => {
  const socket = useContext(SocketContext);

  const router = useRouter();
  const classes = useStyles();

  const [roomNo, setRoomNo] = useState('');
  const [chatList, setChatList] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    console.log('router useEffect');
    if (!router.isReady) return;
    setRoomNo(router.query.roomNo);
  }, [router.isReady, router.query.roomNo]);

  useEffect(() => {
    // socket = io('http://localhost:3001');

    if (roomNo) {
      console.log(roomNo);
      socket.emit('join', { username: 'name', roomNo });
    }
    // return () => {
    //   socket.disconnect();
    // };
  }, [roomNo, socket]);
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log('useEffect event');
    socket.on('message', ({ id, message }) => {
      console.log(message);
      setChatList((prev) => prev.concat({ id, text: message }));
    });
    socket.on('onConnect', ({ text }) => {
      console.log('clients onconnect');
      console.log(text);
    });
    socket.on('disconnect', () => {
      socket.disconnect();
    });
  }, [socket]);

  const enterChatHandler = (event) => {
    if (event.keyCode === 13) {
      socket.emit('message', { message: chatInput });
      setChatInput('');
    }
  };

  const clickChatHandler = () => {
    socket.emit('message', { message: chatInput });
    setChatInput('');
  };
  return (
    <div className={classes.container}>
      <AppBar position="static" className={classes.titleBar}>
        <Toolbar>
          <Typography variant="h5" component="div" className={classes.titleText}>
            React 정보 공유방
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {chatList.map((chat) => {
          return (
            <p key={chat.id} className={classes.chatContainer}>
              <PersonIcon className={classes.icon} />
              {chat.text}
            </p>
          );
        })}
      </div>
      {/* <Grid> */}
      <div className={classes.inputContainer}>
        <PersonIcon className={classes.icon} />
        <input
          className={classes.inputForm}
          type="text"
          placeholder="내용을 입력해주세요"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={enterChatHandler}
        />
        <button type="button" onClick={clickChatHandler} className={classes.button}>
          입력
        </button>
      </div>
      {/* </Grid> */}
    </div>
  );
};
export default ChatRoom;
