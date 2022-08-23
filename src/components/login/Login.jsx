import React, { useState, useEffect } from 'react'
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'

import Input from './Input'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../api/firebase'

const Login = () => {
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [password, setPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            setErrorEmail(!validateEmail(email))
            setErrorPassword(!validatePassword(password))
            return
        }

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            if (user) {
                navigate("/")
            }

        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        document.title = 'Sign In'
    }, [])

    return (
        <div className='w-full h-screen bg-primary-bg text-primary flex flex-col items-center justify-start'>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center w-[80%] md:w-[70%] lg:w-[60%]">
                <h2 className='text-center mt-16 text-2xl mb-10 text-blue font-bold'>Sign in to FilmNet</h2>
                <div className="w-full relative">
                    <Input
                        type='email'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => hanldeBlurEmail(e.target.value)}
                    />
                    {errorEmail &&
                        <p className='absolute -bottom-6 left-0 text-red-text text-base mt-2'>*Please enter valid email address</p>}
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
                {error && <p className='text-red-text text-base mt-2'>Email or password was wrong!</p>}
                <button
                    className='mt-10 px-12 py-3 bg-blue text-primary font-semibold rounded-xl outline-none border-none'
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    Sign In</button>
                <p className='mt-5 text-gray-text text-base hover:text-primary cursor-pointer'>Forgot password?</p>
                <p
                    className='mt-5'
                >Don't have an account? <Link to={'/register'} className="text-blue font-semibold">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login