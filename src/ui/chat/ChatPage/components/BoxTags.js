import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { openChat, openPublicChat } from "../../../actions/chatActions";


const useStyles = makeStyles({
  root: {
    width: 275,
    height: "100%",
    margin: "0px 12px"
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
    marginTop: 20,
    height: "100%"
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

export default function BoxTags() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useFirestoreConnect([
    { collection: 'hashtags' }
  ]);

  const hashtags = useSelector((state) => state.firestore.ordered.hashtags);
  const hashtagsLoaded = useSelector((state) => state.firestore.status.requested.hashtags);
  let hashtagsGroups = hashtags?.reduce((r, a) => {

    r.set(a.category, [...r.get(a.category) || [], a]);
    return r;
  }, new Map());

  const [currentHashtag, setCurrentHashtag] = useState(null);
  const currentChatId = useSelector(state => state.chat.currentChatId);
  const hashtagClicked = (hashtag) => {
    setCurrentHashtag(hashtag);
    dispatch(openPublicChat(hashtag.chatId));
  };

  if (hashtagsLoaded && currentHashtag === null && hashtags?.[0]) {
    hashtagClicked(hashtags[0]);
  }
  return (
    <div className="scrollHash">
      <Card className={classes.root} variant="outlined">
        <CardContent style={{ height: "100%" }}>
          <Typography variant="h5" component="h1">
            COMUNIDADE
          </Typography>
          <Typography variant="body2" className={classes.title} component="p" color="textSecondary">
            Participe da conversa
            <br />
            através dos tópicos abaixo.
          </Typography>
          <List className={classes.rootList} subheader={<li />}>
            {
              hashtagsGroups && Array.from(hashtagsGroups.keys()).map((k) => (<div><Typography variant={"h6"} style={{ textTransform: "capitalize" }} >{k}</Typography>
                {hashtagsGroups.get(k)?.map((hashtag) => {
                  return (
                    <ListItem key={`item-${hashtag.name}`} style={{ textTransform: "uppercase", fontSize: "1.2em" }}>
                      <Link color={"secondary"} href={`#`} onClick={() => hashtagClicked(hashtag)} >
                        {
                          currentChatId === hashtag.chatId
                            ? <b> {`#${hashtag.name}`} </b>
                            : <div>{`#${hashtag.name}`}</div>
                        }

                      </Link>
                    </ListItem>
                  );
                })}
              </div>)
              )
            }

          </List>
        </CardContent>
      </Card>
    </div>
  );
}
