import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import "../sass/message.scss"
import {getTime} from "../utils/convertDate";

function Message({ message }: any) {
    const [userLoggedIn] = useAuthState(auth)

    let time  = message?.timestamp?.toDate()


    return (
        <div className={`message ${userLoggedIn?.email == message.from ? "reciever" : ""}`}>
            <p> {message.message} </p>
            <span className="chat_timestamp"> {getTime(time)} </span>
        </div>
    )
}

export default Message
