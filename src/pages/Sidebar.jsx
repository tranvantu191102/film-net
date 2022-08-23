import React, { useState, useEffect, useRef, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHouse, faCompass, faMagnifyingGlass, faBookmark, faClock, faCircleUser, faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../api/firebase'

import { AuthContext } from '../contexts/AuthContext'
import { ModalContext } from '../contexts/ModalContext';

const Sidebar = ({ setActiveMobile, activeMobile, toggleRef }) => {

    const menu = [
        {
            path: '/',
            display: 'Home',
            icon: faHouse
        },
        {
            path: '/explore',
            display: 'Explore',
            icon: faCompass
        },
        {
            path: '/search',
            display: 'Search',
            icon: faMagnifyingGlass
        }
    ]

    const personal = [
        {
            path: '/bookmark',
            display: 'Saved',
            icon: faBookmark
        },
        {
            path: '/history',
            display: 'History',
            icon: faClock
        }
    ]

    const general = [
        {
            path: '/profile',
            display: 'Profile',
            icon: faCircleUser
        },
        {
            path: '/login',
            display: 'Login',
            icon: faArrowRightFromBracket
        }
    ]

    const { pathname } = useLocation()
    const [active, setActive] = useState('/')
    const { isLogin, setIsLogin } = useContext(AuthContext)
    const { setShowModalNotLogin } = useContext(ModalContext)
    const contentRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setActive(pathname)
    }, [pathname])

    useEffect(() => {
        const handler = (e) => {
            if (!contentRef?.current?.contains(e.target) && toggleRef.current !== e.target) {
                setActiveMobile(false)
            }
        }
        window.addEventListener('click', handler)
        return () => {
            window.addEventListener('click', handler)
        }
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
        setIsLogin(false)
        navigate("/login")
    }

    const handlePageAuth = (item) => {
        if (!isLogin) {
            if (item.path === '/login') {
                setShowModalNotLogin(false)
                navigate(item.path)
                return
            }
            setShowModalNotLogin(true)
            return
        }
        // setShowModalNotLogin(false)

        navigate(item.path)
    }


    return (
        <div ref={contentRef}
            className={`fixed top-0 left-0 h-screen lg:w-[20vw] md:w-[12vw] md:px-5 px-10 pt-7 pb-2  transition duration-200 ease-linear bg-inherit border-r-[1px] border-border
        transform  md:visible md:opacity-100 md:translate-x-0 md:pointer-events-auto
        ${activeMobile ? 'visible opacity-100 translate-x-0 pointer-events-auto z-[9999]'
                    : 'invisible opacity-0 -translate-x-20 pointer-events-none '}`}>
            <div className="tw-flex-center">
                <Link to='/'>
                    <p className='lg:text-2xl hidden md:block text-xl text-primary font-semibold'>Film<span
                        className='text-blue'
                    >
                        NET</span></p>
                </Link>
            </div>
            <div className="text-primary mt-4">
                <h3 className='lg:text-2lg md:text-lg font-semibold'>MENU</h3>
                <div className="ml-3 mt-2">
                    {
                        menu.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <div className={` relative flex items-center justify-start text-2lg p-1 my-2 hover:text-blue
                                ${active === item.path ? 'text-blue item-sidebar' : ''}`}
                                >
                                    <FontAwesomeIcon icon={item.icon} className='lg:mr-4 lg:text-inherit lg:mb-0 md:text-xl mb-4 md:mr-0' />
                                    <p className='lg:block hidden'>{item.display}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="text-primary mt-10">
                <h3 className='lg:text-2lg md:text-lg font-semibold'>PERSONAL</h3>
                <div className="ml-3 mt-2">
                    {
                        personal.map((item, index) => (
                            <div key={index}
                                onClick={() => handlePageAuth(item)}
                            >
                                <div className={`relative flex items-center justify-start text-2lg p-1 my-2 hover:text-blue cursor-pointer
                                ${active === item.path ? 'text-blue item-sidebar' : ''}`}
                                >
                                    <FontAwesomeIcon icon={item.icon} className='lg:mr-4 lg:text-inherit lg:mb-0 md:text-xl mb-4 md:mr-0' />
                                    <p className='lg:block hidden'>{item.display}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="text-primary mt-10">
                <h3 className='lg:text-2lg md:text-lg font-semibold'>GENERAL</h3>
                <div className="ml-3 mt-2">
                    {
                        general.map((item, index) => (
                            <div
                                onClick={() => handlePageAuth(item)}
                                key={index}
                                className={`${isLogin && item.path === '/login' ? 'hidden' : ''}`}>
                                <div className={`relative flex items-center justify-start text-2lg p-1 my-2 hover:text-blue cursor-pointer
                                ${active === item.path ? 'text-blue item-sidebar' : ''}`}
                                >
                                    <FontAwesomeIcon icon={item.icon} className='lg:mr-4 lg:text-inherit lg:mb-0 md:text-xl mb-4 md:mr-0' />
                                    <p className='lg:block hidden'>{item.display}</p>
                                </div>
                            </div>
                        ))
                    }
                    {
                        isLogin &&

                        <div className={` flex items-center justify-start text-2lg p-1 my-2 hover:text-blue
                        cursor-pointer`}
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket}
                                className='lg:mr-4 lg:text-inherit lg:mb-0 md:text-xl mb-4 md:mr-0
                            transform rotate-180' />
                            <p className='lg:block hidden'>Log Out</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar