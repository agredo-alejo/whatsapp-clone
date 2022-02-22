import React from 'react'
import "../sass/addContact.scss"
import { AiOutlineClose } from "react-icons/ai"

function AddContact({ contactState, modalState, addChat }: any) {
    const [newContact, setNewContact] = contactState
    const [showAddContact, setShowAddContact] = modalState

    return (
        <div className={`${showAddContact ? "modal" : "hide"}`}>
            <div className="addContact">
                <AiOutlineClose onClick={()=>{setShowAddContact(false)}} />
                <p>
                    Enter an email adress for the user you wish to chat with
                </p>

                <span>
                    <input type="text" value={newContact} onChange={e => { setNewContact(e.target.value) }} />

                    <button onClick={addChat}>Add Contact</button>
                </span>
            </div>

        </div>
    )
}

export default AddContact
