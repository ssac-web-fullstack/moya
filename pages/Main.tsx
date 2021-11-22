import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AssignmentOutlined, TextsmsOutlined } from '@material-ui/icons';

import logo from '../public/moya-logo.png';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(5),
  },

  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#bdbdbd',
    width: 400,
    height: 400,
    margin: 5,
    borderRadius: 10,
  },
}));

function Main() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container} spacing={4}>
        <Grid item className={classes.item} xs={12} sm={6} md={4}>
          <Image src={logo} width={200} height={200} />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={6} md={6}>
          <Box className={classes.box}>
            <AssignmentOutlined fontSize="large" />
            <div>
              <Link href="/Login">게시판</Link>
            </div>
          </Box>
          <Box className={classes.box}>
            <TextsmsOutlined fontSize="large" />
            <div>
              <Link href="/Regist">채팅</Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Main;
