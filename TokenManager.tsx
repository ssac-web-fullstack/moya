import { ModeCommentTwoTone } from '@material-ui/icons';
import axios from 'axios';
import cookies from 'next-cookies';

// TODO: accessToken 여부 확인, refreshToken 여부 확인
const checkCookie = () => {
  // let validAccess: boolean
  // let validRefresh: boolean
  const clientCookies = document.cookie;
  console.log(clientCookies);
};

// TODO: accessToken, RefreshToken 여부 리턴하는 함수 만들기 --> 그냥 쿠키를 확인하면 댐 ㅋㅎㅎ

// TODO: payload에서 정보 빼는 함수 만들기 --> 나중에

module.exports = checkCookie;
