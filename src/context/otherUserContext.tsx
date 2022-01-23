import React, { useState, useContext } from 'react'

export const OtherUserContext = React.createContext<any>(undefined)
export const OtherUserUpdateContext = React.createContext<any>(undefined)

export function useOtherUser() {
    return useContext(OtherUserContext)
}
export function useOtherUserUpdate() {
    return useContext(OtherUserUpdateContext)
}

let otherUserTest = {
    id: undefined
}

export function OtherUserProvider({ children }: any) {
    const [otherUser, setOtherUser] = useState(otherUserTest)

    // function changeOtherUser(secondUser: any) {
    //     setOtherUser(secondUser)
    // }

    return (
        <OtherUserContext.Provider value={otherUser}>
            <OtherUserUpdateContext.Provider value={(secondUser: any) => setOtherUser(secondUser)}>
                {children}
            </OtherUserUpdateContext.Provider>
        </OtherUserContext.Provider>
    )
}