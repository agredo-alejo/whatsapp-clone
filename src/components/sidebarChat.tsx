import React from 'react'
import '../sass/sidebarChat.scss'
import { FaUserCircle } from "react-icons/fa";
import { useOtherUserUpdate } from "../context/otherUserContext";
import getRecipientEmail from '../utils/getRecipientEmail';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {getDate, getTime} from '../utils/convertDate';
import { useShowSidebarUpdate } from "../context/showSidebarContext";

function SidebarChat(props: any) {
    const updateOtherUser = useOtherUserUpdate()
    const updateShowSidebar = useShowSidebarUpdate()
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(props.users, user)

    const messagesRef = collection(db, "chats", `${props.id}`, "messages")
    const q = query(messagesRef, orderBy('timestamp', 'desc'))
    const [messagesSnapshot] = useCollectionData(q, { idField: 'id' })

    const usersRef = collection(db, "users")
    const userQuery = query(usersRef, where('email', '==', `${getRecipientEmail(props.users, user)}`))
    const [userSnapshot] = useCollectionData(userQuery)



    let name = userSnapshot ? userSnapshot[0]?.name ? userSnapshot[0]?.name : recipientEmail : ""
    let photoURL = userSnapshot ? userSnapshot[0]?.photoURL ? userSnapshot[0]?.photoURL : undefined : undefined
    let time = userSnapshot ? userSnapshot[0]?.lastSeen ? userSnapshot[0]?.lastSeen.toDate() : new Date() : new Date()



    return (

        <div className="sidebarChat">
            <button onClick={() => {
                updateOtherUser({
                    name: name,
                    id: props.id,
                    photoURL: photoURL,
                    lastSeen: `${getTime(time)}${getDate(time)}`
                })
                updateShowSidebar(false)

            }}>
                {photoURL ?
                    <img src={photoURL} />
                    :
                    <FaUserCircle />
                }
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messagesSnapshot ? messagesSnapshot[0]?.message : ""}</p>
                </div>
            </button>
        </div>
    )
}

export default SidebarChat
