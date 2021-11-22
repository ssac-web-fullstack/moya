import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
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
    maxWidth: 300,
  },

  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  button: {
    background: '#039be5',
    maxWidth: 150,
    marginRight: 20,
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={4}>
      <Grid item className={classes.item} xs={12} sm={6} md={4}>
        <Image className={classes.logo} src={logo} alt="logo" width={500} height={500} />
      </Grid>

      <Grid item className={classes.item} xs={12} sm={6} md={4}>
        <form noValidate autoComplete="off">
          <Box className={classes.box}>
            <TextField
              label="아이디"
              placeholder="아이디를 입력하세요."
              margin="normal"
              variant="outlined"
            />
          </Box>
          <Box className={classes.box}>
            <TextField
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              margin="normal"
              variant="outlined"
            />
          </Box>
        </form>
        <Box className={classes.box}>
          <Button className={classes.button} variant="contained" color="primary">
            로그인
          </Button>
          <Button className={classes.button} variant="contained" color="primary">
            회원가입
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
