import React from "react";
import { useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {PrivateChatItem} from "./PrivateChatItem";
import {PublicChatItem} from "./PublicChatItem";
import Typography from "@material-ui/core/Typography";
import "./chat_item.css";

export default function ChatItem({chatId}) {

    useFirestoreConnect([{
        collection:"chats",
        doc: chatId
    }]);

    const chat = useSelector(state => state.firestore.data.chats?.[chatId]);
    const chatLoaded = useSelector(state => state.firestore.status.requested["chats/" + chatId]);

    const auth = useSelector(state => state.firebase.auth);

    return (<div className={"chat-item"} key={chatId}>
        {!chatLoaded ? <div/> : chat.type === "private" ? <OnPrivate chat={chat}  auth={auth} />
            : <PublicChatItem  className={"chat-item"} chat={chat} />}

    </div>);

    if(!chat){
        return <Typography>Não foi possivel carregar essa conversa</Typography>;
    }

    if(chat.type === "private") {

    }
    else {
    }

}

function OnPrivate({chat, auth}){
    let contactId = chat.members.find(id => id !== auth.uid);
    if(contactId) {
        return <PrivateChatItem  className={"chat-item"} chat={chat} contactId={contactId}/>;
    }
}
