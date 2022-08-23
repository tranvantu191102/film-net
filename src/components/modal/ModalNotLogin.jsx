import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import { useNavigate } from 'react-router-dom'

const ModalNotLogin = ({ active }) => {

    const { setShowModalNotLogin } = useContext(ModalContext)
    const navigate = useNavigate()
    const handleGotoSignIn = () => {
        navigate("/login")
        setShowModalNotLogin(false)
    }

    const clickOutSide = () => {
        setShowModalNotLogin(false)
    }

    return (
        <div className={`fixed inset-0 w-full h-screen bg-transparent transform transition-all duration-100 z-[9999]
         ease-linear 
         ${active ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'}`}>
            <div className="absolute z-[99] position-abs-center-xy bg-gray-bg rounded-xl py-2 flex flex-col 
            items-center justify-center">

                <div className="text-xl text-blue font-semibold px-10 pt-5">
                    You need to sign in to use this feature
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                    <button className='text-xl w-full border-y-[1px] border-gray-text  font-semibold py-2 text-blue mt-5 mb-2 '
                        onClick={handleGotoSignIn}
                    >Sign In</button>
                    <button className='text-xl w-full  border-gray-text  font-normal py-2 text-gray-text'
                        onClick={() => setShowModalNotLogin(false)}
                    >Cancel</button>
                </div>
            </div>
            <div className="absolute inset-0 w-full h-full bg-primary-bg opacity-50 z-10"
                onClick={clickOutSide}></div>
        </div>
    )
}

export default ModalNotLogin