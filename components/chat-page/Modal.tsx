import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';

// interface Props {

// }
const useStyles = makeStyles({
  modal: {
    boxShadow: ' 0 1px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    backgroundColor: 'white',
    padding: '1rem',
    textAlign: 'center',
    width: '30rem',
    zIndex: 10,
    position: 'fixed',
    top: '20vh',
    left: 'calc(50% - 15rem)',
  },
});

const Modal = ({ onClick, onCreate }) => {
  const [input, setInput] = useState('');
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <h1>채팅방 생성하기</h1>
      <input
        type="text"
        placeholder="방제목"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <div>
        <Button
          onClick={() => {
            onCreate(input);
            onClick();
          }}
        >
          생성
        </Button>
        <Button onClick={onClick}>취소</Button>
      </div>
    </div>
  );
};

export default Modal;
