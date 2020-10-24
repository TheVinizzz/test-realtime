import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemText from "@material-ui/core/ListItemText";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";
import {CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {openChat, openPrivateChat} from "../../../../actions/chatActions";
import "./chat_item.css";


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPic() {
    return `https://randomuser.me/api/portraits/men/${randomIntFromInterval(1, 30)}.jpg`;
}

export function PrivateChatItem({chat, contactId}) {

    const dispatch = useDispatch();
    const [chatImage, setChatImage] = useState(getRandomPic());

    useFirestoreConnect([
        {
            collection: "users",
            doc: contactId
        }
    ]);


    const contactProfile = useSelector(state => state.firestore.data.users?.[contactId]);
    const contactProfileLoaded = useSelector(state => state.firestore.status.requested["users/" + contactId]);

    if(!contactProfileLoaded){
        return <div />
    }

    if(!contactProfile) {
        return <Typography>Não foi possivel encontrar o contato dessa conversa</Typography>
    }

    return (
        <>
            <ListItem className={"chat-item"} button onClick={() => dispatch(openPrivateChat(chat.id, contactId))} >
                <ListItemAvatar>
                    <Avatar
                        src={contactProfile?.photoUrl}
                    >
                        {contactProfile?.name?.substring(0, 1) ?? ""}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText secondaryTypographyProps={{noWrap: true}} primaryTypographyProps={{noWrap: true}} primary={contactProfile.name} secondary={chat.lastMessage?.body} />
            </ListItem>
        </>
    );
}
