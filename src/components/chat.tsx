import React, { useState, useRef, useEffect } from 'react'
import "../sass/chat.scss"
import { FaUserCircle } from "react-icons/fa";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { useOtherUser } from "../context/otherUserContext";
import { serverTimestamp, collection, query, orderBy,doc, addDoc, setDoc} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './message';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { IconButton } from "@material-ui/core";
import { useShowSidebar, useShowSidebarUpdate } from "../context/showSidebarContext";


function Chat() {
    const showSidebar = useShowSidebar()
    const updateShowSidebar = useShowSidebarUpdate()
    const scrollDummy = useRef<null | HTMLDivElement>(null);
    const inpt = useRef<any>(null);

    const [user] = useAuthState(auth)
    let otherUser = useOtherUser()


    const messagesRef = collection(db, "chats", `${otherUser.id}`, "messages")
    const q = query(messagesRef, orderBy('timestamp'))
    const [messagesSnapshot] = useCollectionData(q, { idField: 'id' })

    const chatRef = doc(db, "chats", `${otherUser.id}`)

    const userRef = doc(db, 'users', `${user?.uid}`)

    
    useEffect(() => {
        scrollDummy.current?.scrollIntoView({ behavior: 'smooth' });
        inpt.current.focus()
    }, [messagesRef])


    
    const [input, setInput] = useState("")

    async function sendMessage(event:any) {
        event.preventDefault()

        await addDoc(messagesRef, {
            from: user?.email,
            message: input,
            timestamp: serverTimestamp()
        })
        await setDoc(chatRef, {
            timestamp: serverTimestamp()
        },
            {
                merge: true
            }
        )

        await setDoc(userRef, {
            email: user?.email,
            lastSeen: serverTimestamp(),
            photoURL: user?.photoURL,
            name: user?.displayName
        },
            {
                merge: true
            }
        )



        setInput("")
        scrollDummy.current!.scrollIntoView({ behavior: 'smooth' });

        inpt.current.focus()

    }
    return (
        <div className={`chat ${showSidebar? "hideChat": ""}`} >
            <div className="chat_header">
                <div className="chat_arrow_photo" onClick={() => {

                    updateShowSidebar(true)
                }} >

                <BiLeftArrowAlt className="chat_arrowBack"  />

                {otherUser.photoURL ? <img src={otherUser.photoURL} /> : <FaUserCircle className="chat_user"/> }
                </div>
                
                <div className="chat_headerInfo">
                    <h3> {otherUser.name} </h3>
                    <p>Last seen at {otherUser.lastSeen} </p>


                </div>
                {/* <div className="chat_headerRight">
                    <IconButton>
                        <BsPaperclip />
                    </IconButton>
                </div> */}
            </div>

            <div className="chat_body">
                {messagesSnapshot?.map((msg: any) => 
                    <Message key={msg.id} id={msg.id} message={msg} />
                )}

                <span ref={scrollDummy} ></span>

            </div>

            <div className="chat_footer">
                <form>
                    <input ref={inpt} type="text" placeholder="Type a message" value={input} onChange={(e: any) => setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}><IoSend /></button>
                </form>
            </div>
        </div>
    )
}

export default Chat
