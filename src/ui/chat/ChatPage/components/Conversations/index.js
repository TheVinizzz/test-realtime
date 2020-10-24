import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {useSelector} from "react-redux";
import ChatItem from "./ChatItem";


const useStyles = makeStyles({
  root: {
    width: 275,
    height: "100%",
    margin: "0px 12px",
    display: "flex",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    marginTop: 10
  },
  pos: {
    marginBottom: 12,
  },
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'auto',
    height: "100%",
    marginTop: 20,
    paddingBottom: 34,
    display: "flex",
    flexDirection: "column"
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

export default function Conversations({onHashtagSelected}) {
  const classes = useStyles();
  const chatIds = useSelector((state) => state.firebase.profile.chats);

  return (
      <Card className={classes.root} variant="outlined">
        <CardContent style={{width:"100%"}}>
          <Typography variant="h5" component="h1">
            Conversas
          </Typography>

          <List  className={classes.rootList} subheader={<li />}>
            {chatIds
                ? chatIds.map(chatId => <ChatItem chatId={chatId} />)
                : <div/>}
          </List>
        </CardContent>
      </Card>
  );
}
