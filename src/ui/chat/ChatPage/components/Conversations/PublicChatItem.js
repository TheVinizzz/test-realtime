import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {openChat, openPublicChat} from "../../../../actions/chatActions";
import {useDispatch} from "react-redux";

export function PublicChatItem({chat}) {
    const dispatch = useDispatch();
    return (
        <>
            <ListItem button onClick={() => dispatch(openPublicChat(chat.id))} >
                {/*<ListItemAvatar>*/}
                {/*    <Avatar>*/}
                {/*        <ImageIcon />*/}
                {/*    </Avatar>*/}
                {/*</ListItemAvatar>*/}
                <ListItemText secondaryTypographyProps={{noWrap: true}} primaryTypographyProps={{noWrap: true}} primary={chat.name} secondary={chat.lastMessage.body} />
            </ListItem>
        </>
    );
}
