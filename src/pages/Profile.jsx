import React, { useEffect, useState, useContext } from 'react'
import { doc, getDoc } from "firebase/firestore";
import {
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'

import { db, auth } from '../api/firebase';
import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import Input from '../components/login/Input';
import EditAccount from '../components/edit-account/EditAccount';
import EditPhoto from '../components/edit-account/EditPhoto';

const Profile = () => {

    const [data, setData] = useState({})
    const [changePassword, setChangePassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [errorNewPassword, setErrorNewPassword] = useState(false)
    const [username, setUsername] = useState("")
    const { userId, isLogin } = useContext(AuthContext)
    const { setShowModalNotLogin } = useContext(ModalContext)

    useEffect(() => {
        document.title = 'Profile'
    }, [])

    useEffect(() => {
        try {
            const getData = async () => {
                setLoadingPage(true)
                const userRef = doc(db, 'users', userId)
                const userSnap = await getDoc(userRef)
                // console.log(userSnap)
                if (userSnap.exists()) {
                    setData(userSnap.data())
                    setUsername(userSnap.data().username)
                }
                setLoadingPage(false)
            }
            getData()
        } catch (error) {
            console.log(error);
            setLoadingPage(false)
        }
    }, [userId])


    const validatePassword = (p) => {
        const regexPassword = /^(?!.* ).{8,15}$/
        return regexPassword.test(p)
    }

    const handleChangePassword = async () => {
        setErrorNewPassword(!validatePassword(changePassword))
        if (errorNewPassword) return
        try {
            setLoading(true)
            const credential = EmailAuthProvider.credential(
                data?.email,
                oldPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, changePassword);
            setOldPassword("")
            setChangePassword("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }

    // console.log(data)
    return (
        <div className='min-h-screen'>
            <div className="text-3xl text-primary font-bold px-5 pt-10 pb-2 border-b-[1px] border-gray-text"
            >ACCOUNT SETTINGS</div>
            {
                loadingPage ?
                    <div className="flex px-5 mt-5">
                        <div className="w-[65%] ">
                            <div className="w-[200px] h-10 skeleton"></div>
                            <div className="w-[400px] h-10 skeleton mt-2"></div>
                            <div className="w-[200px] h-10 skeleton mt-6"></div>
                            <div className="w-[100px] h-8 skeleton mt-2"></div>
                            <div className="w-[200px] h-10 skeleton mt-2"></div>
                            <div className="w-[100px] h-8 skeleton mt-2"></div>
                            <div className="w-[200px] h-10 skeleton mt-6"></div>
                            <div className="w-[300px] h-8 skeleton mt-2"></div>
                            <div className="w-[300px] h-8 skeleton mt-5"></div>
                        </div>
                        <div className="w-[35%]">
                            <div className="w-[200px] h-10 skeleton"></div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-[250px] h-[250px] rounded-full skeleton mt-6"></div>
                                <div className="w-[200px] h-10 skeleton mt-5"></div>
                                <div className="w-[200px] h-10 skeleton mt-2"></div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col md:flex-row  px-5 mt-5">
                        <div className="w-[100%] md:w-[65%]">
                            <h2 className='text-2xl text-primary font-semibold'
                            >User Information</h2>
                            <p className='w-[60%] text-base text-gray-text font-normal'
                            >Here you can edit public information about yourself.</p>
                            <div className="mt-6 ">
                                <div className="">
                                    <h4 className='text-xl text-primary font-semibold'>Email</h4>
                                    <p className='text-base text-gray-text font-semibold'>{data?.email}</p>
                                </div>

                            </div>
                            <EditAccount
                                className="mt-2"
                                name="Name"
                                data={username}
                                onChange={(e) => setUsername(e.target.value)}
                                user={data}
                            />
                            <div className="mt-5  flex items-center justify-between pr-5 flex-wrap lg:flex-nowrap">
                                <div className="text-primary w-full">
                                    <h4 className='text-xl text-primary font-semibold mb-4'>Change password</h4>
                                    <div className="mb-2 w-[80%] max-w-[80%]">
                                        <Input
                                            type="password"
                                            label="Old password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        {
                                            error && <span className='text-red-text'>*Password was wrong!</span>
                                        }
                                    </div>
                                    <div className="mt-6 w-[80%]  max-w-[80%]">
                                        <Input
                                            type="password"
                                            label="New password"
                                            value={changePassword}
                                            onChange={(e) => setChangePassword(e.target.value)}
                                        />
                                        {
                                            errorNewPassword &&
                                            <span className='text-red-text'
                                            >*Password must has at least 8 character and cannot contain white spaces.</span>
                                        }
                                    </div>
                                </div>
                                <div className="text-primary text-base mt-5 lg:mt-0 px-4 py-3 text-center w-[40%] bg-gray-bg rounded-xl hover:opacity-80 cursor-pointer"
                                    onClick={handleChangePassword}
                                >
                                    {loading ?
                                        <div className="w-full flex items-center justify-center py-1 bg-blue-text rounded-md">
                                            <svg className="animate-spin h-5 w-5 ... text-white-text" viewBox="0 0 24 24">
                                                <FontAwesomeIcon icon={faSpinner} />
                                            </svg>
                                        </div>
                                        : ' Update password'}
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-10">
                                <button
                                    className='px-16 py-3 text-red-text border-[1px] border-red-text rounded-xl hover:bg-gray-bg'
                                >Delete account?</button>
                            </div>
                        </div>
                        <EditPhoto
                            data={data}
                        />
                    </div>
            }
        </div>
    )
}

export default Profile