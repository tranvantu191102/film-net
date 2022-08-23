import React, { createContext, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../api/firebase'
import { ModalContext } from "./ModalContext";

export const AuthContext = createContext()


const AuthContextProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false)
    const [userId, setUserId] = useState("")
    // const { setShowModalNotLogin } = useContext(ModalContext)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLogin(true)
            // setShowModalNotLogin(false)
            setUserId(user.uid)
        } else setIsLogin(false)
    })

    const value = { isLogin, setIsLogin, userId }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
