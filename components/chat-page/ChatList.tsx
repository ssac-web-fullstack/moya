import React from 'react';
// import { BrowserView, MobileView } from 'react-device-detect';
import ChatCard from './ChatCard';

type Props = {
  chatList: { id: number; title: string }[];
};
const ChatList: React.FC<Props> = ({ chatList }) => {
  return (
    <div style={{ margin: '0 25%' }}>
      <ChatCard chatList={chatList} />
    </div>
    /* <MobileView>
        <div style={{ margin: '0 5%' }}>
          <ChatCard chatList={chatList} />
        </div>
      </MobileView> */
  );
};

export default ChatList;
