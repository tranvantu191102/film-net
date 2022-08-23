import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext'

const ModalNotification = ({ active, text }) => {
    const { setShowModalNotification } = useContext(ModalContext)
    const clickOutSide = () => {
        setShowModalNotification(false)
    }
    return (
        <div className={`fixed inset-0 w-full h-screen bg-transparent transform transition-all duration-75 z-[9999]
        ease-linear 
        ${active ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'}`}>
            <div className="absolute z-[99] position-abs-center-xy bg-primary rounded-xl py-2 flex flex-col 
           items-center justify-center">

                <div className="text-green text-xl font-bold py-5 px-10 text-center">{text}</div>
            </div>
            <div className="absolute inset-0 w-full h-full bg-primary-bg opacity-50 z-10"
                onClick={clickOutSide}></div>
        </div>
    )
}

export default ModalNotification