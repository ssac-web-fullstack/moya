import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import ChatList from '../components/chat-page/ChatList';
import Modal from '../components/chat-page/Modal';

const useStyles = makeStyles({
  title: {
    fontSize: '2rem',
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
});
const Chat: React.FC<Props> = ({ chat }) => {
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const modalHandler = () => {
    setModal(!modal);
  };
  const createPostHandler = async (title: string) => {
    await axios.post('/api/hello', {
      title,
    });
  };
  return (
    <div>
      <div className={classes.title}>채팅방 목록</div>
      <div className={classes.button}>
        <Link href="/chat">
          <a>
            <Button variant="contained">새로고침</Button>
          </a>
        </Link>
        <Button variant="contained" onClick={modalHandler}>
          방 추가
        </Button>
      </div>
      <div>
        {/* <ChatCard id={chatData[0].id} title="react" /> */}
        <ChatList chatList={chat} />
      </div>
      {modal ? <Modal onClick={modalHandler} onCreate={createPostHandler} /> : ''}
    </div>
  );
};
export async function getStaticProps() {
  const res = await axios.get('http://localhost:3001/api/0.1/chat');
  const chat = res.data;
  return {
    props: { chat },
  };
}
export default Chat;
