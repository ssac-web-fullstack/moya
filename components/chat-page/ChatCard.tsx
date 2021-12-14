// import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// interface Props {
//   id: number;
//   title: string;
// }

const useStyles = makeStyles({
  container: {
    margin: '2% 0',
    // width: '100%',
    // display: 'flex',
    // justifyContent: 'center',
  },

  cardContainer: {
    // margin: '0 5%',
    // padding: '0 100px',
    // width: '100%',
    display: 'flex',
    // placeContent: 'center',
    justifyContent: 'center',
    // padding: '0 px',
  },

  card: {
    width: '85%',
    height: '250px',
    marginBottom: '5%',
  },
  cardTop: {
    height: '60%',
    backgroundColor: '#6bb9ed',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'end',
    height: '40%',
  },
  button: {
    width: '55px',
    height: '40px',
    border: '1px solid black',
    color: 'black',
  },
});
// const chatData: ChatData[] = [
//   { id: 1, title: '리액트 공부' },
//   { id: 2, title: 'next.js 공부' },
//   { id: 3, title: 'html/css study' },
//   { id: 4, title: 'typescript' },
//   { id: 5, title: 'javascript' },
//   { id: 6, title: 'jquery' },
//   { id: 7, title: 'test' },
//   { id: 8, title: 'aws' },
//   { id: 9, title: '심심풀이' },
//   { id: 10, title: '테스트방' },
// ];
interface chatType {
  id: number;
  title: string;
}

interface Props {
  chatList: chatType[];
}
const ChatCard: React.FC<Props> = ({ chatList }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      {chatList.map((data) => {
        return (
          <Grid item sm={6} xs={12} key={data.id} className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardContent className={classes.cardTop}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {data.id}
                  <span>번 방</span>
                </Typography>
                <Typography variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="h6" component="div">
                  (3/5)
                </Typography>
              </CardContent>
              <CardActions className={classes.cardBottom}>
                <Link href={`/chat/${data.id}`}>
                  <a>
                    <Button size="small" className={classes.button}>
                      방 접속
                    </Button>
                  </a>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChatCard;
