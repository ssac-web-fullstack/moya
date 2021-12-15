import { TextField, Button, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import { customAlert } from '../../components/commons/CustomAlert';
import logo from '../../public/moya-logo.png';

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

const Login = () => {
  const classes = useStyles();

  interface bodyType {
    inputId: string;
    inputPassword: string;
  }

  const [loginIdProp, resetloginId] = useInput('');
  const [passwordProp, resetPassword] = useInput('');

  const onClickHandler = () => {
    const body: bodyType = {
      inputId: loginIdProp.value,
      inputPassword: passwordProp.value,
    };

    if (body.inputId && body.inputPassword) {
      axios
        .post('http://localhost:3001/api/0.1/login', body)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

      resetloginId();
      resetPassword();
    } else {
      customAlert({
        title: '올바른 형식을 입력해주세요.',
        text: '아이디와 비밀번호를 모두 입력해주세요',
      });
    }
  };

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
              {...loginIdProp}
              required
            />
          </Box>
          <Box className={classes.box}>
            <TextField
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              margin="normal"
              variant="outlined"
              {...passwordProp}
              required
            />
          </Box>
        </form>
        <Box className={classes.box}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={onClickHandler}
          >
            로그인
          </Button>
          <Button className={classes.button} variant="contained" color="primary">
            <Link href="/user/Regist">회원가입</Link>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
