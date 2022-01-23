import React, { useState, useContext } from 'react'

export const ShowSidebarContext = React.createContext<any>(undefined)
export const ShowSidebarUpdateContext = React.createContext<any>(undefined)

export function useShowSidebar() {
    return useContext(ShowSidebarContext)
}
export function useShowSidebarUpdate() {
    return useContext(ShowSidebarUpdateContext)
}

export function ShowSidebarProvider({ children }: any) {
    const [ShowSidebar, setShowSidebar] = useState(true)

    return (
        <ShowSidebarContext.Provider value={ShowSidebar}>
            <ShowSidebarUpdateContext.Provider value={(showSidebar: boolean) => setShowSidebar(showSidebar)}>
                {children}
            </ShowSidebarUpdateContext.Provider>
        </ShowSidebarContext.Provider>
    )
}