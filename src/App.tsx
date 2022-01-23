import React, { useState } from 'react'
import './sass/app.scss'
import Sidebar from './components/sidebar'
import Chat from './components/chat'

import { useOtherUser } from "./context/otherUserContext";
import NoOpenChat from "./components/noOpenChat";
import Login from './components/login';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase"

function App() {
  const otherUser = useOtherUser()

  const [user] = useAuthState(auth)


  return (
    <div className="app">

      {!user ? <Login /> :
        <div className="app_body">
          <Sidebar />
          {otherUser.name == undefined ?
            <NoOpenChat /> :
            <Chat />}

        </div>
      }
    </div>
  )
}

export default App
