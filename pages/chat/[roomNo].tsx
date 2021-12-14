import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { io, Socket } from 'socket.io-client';
// import { FixedSizeList as List } from 'react-window';
import axios from 'axios';

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
  chatList: {
    border: '1px solid black',
    minHeight: '80vh',
    maxHeight: '80vh',
    marginBottom: '2%',
    padding: '1rem',
    overflow: 'scroll',
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
// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }
let socket: Socket;
const ChatRoom = () => {
  // const socket = useContext(SocketContext);
  const router = useRouter();
  const classes = useStyles();
  const messageEl = useRef(null);

  const [roomNo, setRoomNo] = useState<string>('');
  const [chatList, setChatList] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    console.log('router useEffect');
    if (!router.isReady) return;
    setRoomNo(router.query.roomNo);
  }, [router.isReady, router.query.roomNo]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);
  useEffect(() => {
    socket = io('http://localhost:3001');

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (roomNo) {
      console.log(roomNo);
      socket.emit('join', { username: 'socket', roomNo });
    }
  }, [roomNo]);

  useEffect(() => {
    console.log('useEffect event');
    socket.on('message', ({ id, message }: { id: number; message: string }) => {
      console.log(message);
      setChatList((prev) => prev.concat({ id, text: message }));
      // setChatList([...chatList, { id, text: message }]);
    });
    socket.on('onConnect', ({ text }: { text: string }) => {
      console.log('clients onconnect');
      console.log(text);
    });
  }, []);

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
  const onDeleteChatroom = async () => {
    await axios.delete(`http://localhost:3001/api/0.1/chat/${roomNo}`);
    router.back();
  };

  // const renderChat = ({ index, style }) => {
  //   return (
  //     <div style={{ display: 'flex' }}>
  //       <p>{chatList[index].text}</p>
  //     </div>
  //   );
  // };
  return (
    <div className={classes.container}>
      <AppBar position="static" className={classes.titleBar}>
        <Toolbar>
          <Typography variant="h5" component="div" className={classes.titleText}>
            React 정보 공유방
          </Typography>
          <Button onClick={onDeleteChatroom} variant="outlined">
            삭제
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.chatList} ref={messageEl}>
        {chatList.map((chat) => {
          return (
            <p key={chat.id} className={classes.chatContainer}>
              <PersonIcon className={classes.icon} />
              {chat.text}
            </p>
          );
        })}
      </div>
      {/* QQQQQ: change to react-window */}
      {/* <List
        height={window.innerHeight}
        width={window.innerWidth - 20}
        itemCount={chatList.length}
        itemSize={10}
      >
        {renderChat}
      </List> */}
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
