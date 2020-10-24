import React, { useState } from 'react';
import BoxTag from './components/BoxTags';
import { makeStyles } from '@material-ui/core/styles';
import ChatMessages, { ChatMessagesEmpty } from "./components/Chat";
import Conversations from "./components/Conversations";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: "1200px",
    flexDirection: "row",
    display: "flex",
    flexGrow: 1,
    height: "100vh",
    padding: "24px",
    width: "100%"
  },
  contentRoot: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  }
}));
export default function ChatPage() {
  const classes = useStyles();
  const currentChatId = useSelector(state => state.chat.currentChatId);
  const currentChatType = useSelector(state => state.chat.currentChatType);
  return (
    <div className={classes.contentRoot}>

      <div className={classes.content}>
        <BoxTag />
        {
          currentChatId === null && currentChatType === "public"
            ? <ChatMessagesEmpty />
            : <ChatMessages style={{ height: "100%" }} />

        }
        <Conversations />
      </div>
    </div>
  );
}
