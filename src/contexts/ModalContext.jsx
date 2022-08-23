import React, { createContext, useState } from "react";


export const ModalContext = createContext()


const ModalContextProvider = ({ children }) => {

    const [showModalNotLogin, setShowModalNotLogin] = useState(false)
    const [showModalNotification, setShowModalNotification] = useState(false)


    const value = {
        showModalNotLogin,
        setShowModalNotLogin,
        setShowModalNotification,
        showModalNotification
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider
