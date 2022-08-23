import React, { useEffect, useState } from 'react'
import { faEnvelope, faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'

import Input from './Input'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../api/firebase'
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
    const [username, setUsername] = useState("")
    const [errorUsername, setErrorUsername] = useState(false)
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [password, setPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Sign up'
    }, [])

    const validateEmail = (e) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regexEmail.test(e)
    }

    const validatePassword = (p) => {
        const regexPassword = /^(?!.* ).{8,15}$/
        return regexPassword.test(p)
    }

    const hanldeBlurEmail = (e) => {
        setErrorEmail(!validateEmail(e))
    }
    const hanldeBlurPassword = (e) => {
        setErrorPassword(!validatePassword(e))
    }

    const hanldeBlurPasswordConfirm = (e) => {
        setErrorPasswordConfirm(e !== password)
    }

    const hanldeBlurUsername = (e) => {
        setErrorUsername(e === '')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password || passwordConfirm !== password || !username) {
            setErrorEmail(!validateEmail(email))
            setErrorPassword(!validatePassword(password))
            setErrorUsername(username === '')
            return
        }

        setLoading(true)
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        const userRef = doc(db, 'users', user.uid)
        await setDoc(userRef, {
            id: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            username: username
        })
        setUsername("")
        setEmail("")
        setPassword("")
        setErrorPasswordConfirm("")
        navigate("/")
        setLoading(false)

    }

    return (
        <div className='w-full h-screen bg-primary-bg text-primary flex flex-col items-center justify-start'>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center w-[80%] md:w-[70%] lg:w-[60%]">
                <h2 className='text-center mt-16 text-2xl mb-10 text-blue font-bold'>Sign up to FilmNet</h2>
                <div className="w-full relative">
                    <Input
                        type="text"
                        label='User name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={(e) => hanldeBlurUsername(e.target.value)}
                    />
                    {errorUsername &&
                        <p className='absolute -bottom-6 left-0 text-red-text text-base mt-2'
                        >*Please enter username</p>}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
                <div className="w-full relative mt-10">
                    <Input
                        type='email'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => hanldeBlurEmail(e.target.value)}
                    />
                    {errorEmail &&
                        <p className='absolute -bottom-6 left-0 text-red-text text-base mt-2'
                        >*Please enter valid email address.</p>}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                </div>

                <div className="mt-10 w-full relative">
                    <Input
                        type={isShowPassword ? 'text' : 'password'}
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => hanldeBlurPassword(e.target.value)}
                    />
                    {errorPassword &&
                        <p className='absolute -bottom-6 left-0 text-red-text text-base mt-2'
                        >*Password must has at least 8 character and cannot contain white spaces.</p>}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                        {
                            isShowPassword ?
                                <FontAwesomeIcon icon={faEye} onClick={() => setIsShowPassword(false)} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setIsShowPassword(true)} />
                        }
                    </div>
                </div>
                <div className="mt-10 w-full relative">
                    <Input
                        type={isShowPassword ? 'text' : 'password'}
                        label='Confirm password'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={(e) => hanldeBlurPasswordConfirm(e.target.value)}
                    />
                    {errorPasswordConfirm &&
                        <p className='absolute -bottom-6 left-0 text-red-text text-base mt-2'
                        >*Password confirmation does not match.</p>}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                        {
                            isShowPassword ?
                                <FontAwesomeIcon icon={faEye} onClick={() => setIsShowPassword(false)} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setIsShowPassword(true)} />
                        }
                    </div>
                </div>
                <button
                    className='mt-10 px-12 py-3 bg-blue text-primary font-semibold rounded-xl outline-none border-none'
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    {loading ?
                        "Loading..." :
                        'Sign Up'}</button>
                <p
                    className='mt-5'
                >Have an account? <Link to={'/login'} className="text-blue font-semibold">Sign In</Link></p>
            </form>
        </div>
    )
}

export default Login