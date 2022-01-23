import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { OtherUserProvider } from "./context/otherUserContext";
import { ShowSidebarProvider } from "./context/showSidebarContext"

ReactDOM.render(
  <React.StrictMode>
    <OtherUserProvider>
      <ShowSidebarProvider>
        <App />
      </ShowSidebarProvider>
    </OtherUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
