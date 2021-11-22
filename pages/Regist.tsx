/* eslint-disable consistent-return */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { TextField, Button, Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import axios from 'axios';
import logo from '../public/moya-logo.png';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    maxWidth: '100%',
    margin: theme.spacing(5),
  },

  item: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  logo: {
    maxWidth: 500,
  },

  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#0288d1',
    maxWidth: 150,
    marginRight: 20,
  },

  smallButton: {
    backgroundColor: '#0288d1',
    fontSize: 12,
    width: 90,
    height: 30,
    marginLeft: 10,
    marginTop: 26,
  },
}));

const Regist: NextPage = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');

  const onChangeName = (evt: any) => {
    setName(evt.currentTarget.value);
  };

  const onChangeNickname = (evt: any) => {
    setNickname(evt.currentTarget.value);
  };

  const onChangeLoginId = (evt: any) => {
    setLoginId(evt.currentTarget.value);
  };

  const onChangePassword = (evt: any) => {
    setPassword(evt.currentTarget.value);
  };

  const onChangePasswordCheck = (evt: any) => {
    setPasswordCheck(evt.currentTarget.value);
  };

  const onChangeEmail = (evt: any) => {
    setEmail(evt.currentTarget.value);
  };

  // 8자리 이상, 영문+숫자+특수문자 포함
  const isValidPassword = (passwd: string): boolean => {
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return regExp.test(passwd);
  };

  const isValidEmail = (mail: string): boolean => {
    const regExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regExp.test(mail);
  };

  const onSubmitHandler = () => {
    if (!isValidPassword(password)) {
      return alert('비밀번호를 형식에 맞춰서 입력해주세요.');
    }

    if (password !== passwordCheck) {
      return alert('비밀번호 확인을 비밀번호와 동일하게 입력하세요.');
    }

    if (!isValidEmail(email)) {
      return alert('올바른 이메일을 입력해주세요.');
    }

    const body = {
      name,
      nickname,
      loginId,
      password,
      email,
    };

    console.log(body);

    axios
      .post('http://localhost:3001/api/0.1/user', body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid container className={classes.container} spacing={4}>
        <Grid item className={classes.item} xs={12} sm={6} md={6}>
          <Image className={classes.logo} src={logo} alt="logo" />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={6} md={4}>
          <form noValidate autoComplete="off">
            <TextField
              label="이름"
              placeholder="이름을 입력하세요."
              margin="normal"
              variant="outlined"
              value={name}
              onChange={onChangeName}
            />
            <div>
              <TextField
                label="닉네임"
                placeholder="닉네임을 입력하세요."
                helperText="중복 검사가 필요합니다."
                margin="normal"
                variant="outlined"
                value={nickname}
                onChange={onChangeNickname}
              />
              <Button className={classes.smallButton} variant="contained" color="primary">
                중복확인
              </Button>
            </div>
            <div>
              <TextField
                label="아이디"
                placeholder="아이디를 입력하세요."
                helperText="중복 검사가 필요합니다."
                margin="normal"
                variant="outlined"
                value={loginId}
                onChange={onChangeLoginId}
              />
              <Button className={classes.smallButton} variant="contained" color="primary">
                중복확인
              </Button>
            </div>
            <TextField
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              helperText="문자, 숫자, 특수문자 포함"
              margin="normal"
              variant="outlined"
              type="password"
              value={password}
              onChange={onChangePassword}
              error={!isValidPassword(password)}
            />
            <div>
              <TextField
                label="비밀번호 확인"
                placeholder="비밀번호를 입력하세요."
                helperText="비밀번호를 확인해주세요."
                margin="normal"
                variant="outlined"
                type="password"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </div>
            <TextField
              label="이메일"
              placeholder="이메일을 입력하세요."
              margin="normal"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
              error={!isValidEmail(email)}
            />
          </form>
          <Box className={classes.box}>
            <Button className={classes.button} variant="contained" color="primary">
              뒤로가기
            </Button>
            <Button
              className={classes.button}
              type="submit"
              onClick={onSubmitHandler}
              variant="contained"
              color="primary"
            >
              회원가입
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Regist;
