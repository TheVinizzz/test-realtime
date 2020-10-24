import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Box, Divider, makeStyles} from '@material-ui/core';
import MessageInput from "../MessageInput";
import Message from "../Message";
import {useFirestoreConnect} from "react-redux-firebase";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import {sendMessage, sendPrivateMessage} from "../../../../actions/chatActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Send as SendIcon} from 'react-feather';
import MessageSkeleton from "../MessageSkeleton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.dark,
    }
}));

function Chat({hashtag, onProfileSelected}) {
    const classes = useStyles();
    const messagesRef = useRef(null);

    let contactId = useSelector(state => state.chat.currentContactId);
    const chatId = useSelector(state =>
        state.firebase.profile.contacts[contactId]?.chatId ?? state.chat.currentChatId);
    const chatType = useSelector(state => state.chat.currentChatType);
    const auth = useSelector((state) => state.firebase.auth);
    const profile = useSelector((state) => state.firebase.profile);


    const chatExists = chatId !== null;

    useFirestoreConnect(chatExists ? [
        {
            collection: 'chats',
            doc: chatId,
            storeAs: "currentChat"
        }
    ] : []);

    const chat = useSelector((state) => state.firestore.data.currentChat);

    useEffect(() => {
        if(chat?.lastMessage?.authorId === auth.uid) {
            scrollMessagesToBottom();
        }
    },[chat?.lastMessage]);


    function scrollMessagesToBottom() {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }

    let isPrivateChat = chatType === "private";

    useFirestoreConnect(contactId ? [{collection: "users", doc: contactId}] : []);

    let contact = useSelector(state => state.firestore.data.users?.[contactId]);

    const send = async (body) => {

        try {
            if(isPrivateChat){
                sendPrivateMessage(profile, contactId, body);
            }
            else {
                await sendMessage(profile, chat, body);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className={classes.root}  variant="outlined">
            <CardHeader title={isPrivateChat ? contact?.name : chat?.name}/>
            <Divider />
            {isPrivateChat && !chatId
                ? <FirstContactMessages contactProfile={contact}/>
                : chatId != null ? <Messages
                    chatId={chatId}
                    messagesRef={messagesRef}
                    onMessagesLoaded={() => scrollMessagesToBottom()}
                    showAuthorName={!isPrivateChat}
                /> : <MessagesSkeleton/>
            }

            <Divider />
            <MessageInput onAdd={() => {}} send={(body) => send(body)} />

        </Card>
    );
}

export function MessagesSkeleton({props}) {
    return (<Box
        flexGrow={1}
        p={2}
        options={{ suppressScrollX: true }}
        style={{overflow: "hidden auto"}}>

    </Box>);
}

export function FirstContactMessages({contactProfile}){
    return (
        <Box
            flexGrow={1}
            p={2}
            options={{ suppressScrollX: true }}
            style={{overflow: "hidden auto"}}
        >
            <Grid container  direction="row"
                  alignItems="center"
                  justify="center" style={{height: "100%"}}>
                <span>
            <Typography align={"center"}>
                <SendIcon style={{height: "28px", width: "28px"}}/>
                <br/>
                    Envie uma mensagem para inicar uma conversa com {contactProfile?.name}
                </Typography >
                    </span>
            </Grid>
        </Box>
    );
}

export function Messages({chatId, messagesRef, onMessagesLoaded, showAuthorName}) {
    useFirestoreConnect([
        {
            collection: 'chats',
            doc: chatId,
            subcollections: [
                {
                    collection: "messages",
                    orderBy: "createdAt",
                }
            ],
            storeAs: "currentChatMessages"
        }
    ]);

    const messages = useSelector((state) =>
        state.firestore.ordered.currentChatMessages);
    const messagesLoaded = useSelector((state) =>
        state.firestore.status.requested["currentChatMessages"]);


    useEffect(() => {
        onMessagesLoaded();
    }, [messagesLoaded]);


    return (
        <Box
            flexGrow={1}
            p={2}
            ref={messagesRef}
            options={{ suppressScrollX: true }}
            style={{overflow: "hidden auto"}}
        >
            {messagesLoaded && messages?.map((message) => (
                <Message
                    key={message.id}
                    message={message}
                    showAuthorName={showAuthorName}
                />
            ))}
        </Box>
    )
}

export function ChatMessagesEmpty() {

    const classes = useStyles();

    return (
        <Card className={classes.root}  variant="outlined">
            <CardHeader title={""}/>
            <Divider />
            <Box
                flexGrow={1}
                p={2}

                options={{ suppressScrollX: true }}
                style={{overflow: "hidden auto"}}
            >
            </Box>
            <Divider />
            <MessageInput />

        </Card>
    );
}

export default Chat;
