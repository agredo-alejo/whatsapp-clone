import React, { useEffect, useState } from 'react'
import "../sass/sidebar.scss";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IconButton } from "@material-ui/core";
import SidebarChat from './sidebarChat';
import { auth, db } from "../firebase"
import { useOtherUserUpdate } from '../context/otherUserContext';
import { BiPlus } from 'react-icons/bi';
import { collection, query, where, doc, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useShowSidebar } from "../context/showSidebarContext";
import AddContact from './addContact';

function Sidebar() {
    let updateOtherUser = useOtherUserUpdate()
    let showSidebar = useShowSidebar()
    const [newContact, setNewContact] = useState("")
    const [showAddContact, setShowAddContact] = useState(false)
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            const userRef = doc(db, 'users', `${user?.uid}`)
            setDoc(userRef, {
                email: user?.email,
                lastSeen: serverTimestamp(),
                photoURL: user?.photoURL,
                name: user?.displayName
            },
                {
                    merge: true
                })
        }
    }, [user])

    const userChatRef = collection(db, 'chats')
    let q = query(userChatRef, where('users', 'array-contains', user?.email))


    const [chatsSnapshot] = useCollectionData(q, { idField: 'id' })

    let sorted: any
    useEffect(() => {
        if (chatsSnapshot?.length == 0) {
            updateOtherUser({
                name: undefined
            })
        }


    }, [chatsSnapshot])

    sorted = chatsSnapshot?.sort((a, b) => (a?.timestamp?.seconds < b?.timestamp?.seconds) ? 1 : -1)

    const chatAlreadyExist = (recipientEmail: any) =>
        !!chatsSnapshot?.find(
            (chat: any) =>
                chat.users.find((user: any) =>
                    user == recipientEmail)?.length > 0
        )

    async function addNewChat() {

        if (!newContact || newContact == "") return
        if (newContact == user?.email || chatAlreadyExist(newContact)) return


        await addDoc(userChatRef, {
            timestamp: serverTimestamp(),
            users: [user?.email, newContact]
        })
        setNewContact("")
    }


    return (<>
        <AddContact addChat={addNewChat} contactState={[newContact, setNewContact]} modalState={[showAddContact, setShowAddContact]} />
        <div className={`sidebar ${showSidebar? "showSidebar" : ""}`} >
            <div className="sidebar_header">
                <IconButton>
                    {user?.photoURL ?
                        <img src={user.photoURL} />
                        :
                        <FaUserCircle />
                    }
                </IconButton>

                <div className="sidebar_headerRight">

                    <IconButton onClick={()=>setShowAddContact(true)}>
                        <BiPlus />
                    </IconButton>

                    <SignOut />
                </div>
            </div>

            <div className="sidebar_chats">
                {sorted?.map((chat: any) => <SidebarChat key={chat.id} id={chat.id} users={chat.users} />)}
            </div>
        </div>
    </>)
}

function SignOut() {
    const changeUser = useOtherUserUpdate()
    return auth.currentUser && (

        <IconButton onClick={() => {
            auth.signOut()
            changeUser({
                id: undefined
            })
        }}>
            <FiLogOut />
        </IconButton>


    )
}
export default Sidebar