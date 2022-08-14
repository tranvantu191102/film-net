import React, {useState, useRef} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Sidebar from './Sidebar'
import Home from './Home'
import Search from './Search'
import Explore from './Explore'
import MovieDetail from '../components/movie-detail/MovieDetail'

const Layout = () => {

    const [activeMobile, setActiveMobile] = useState(false)
    const toggleRef = useRef(null)
    return (
        <div className='bg-primary-bg'>
            <div className="flex items-center justify-between p-5 text-primary md:hidden">
                <Link to='/'>
                    <p className='lg:text-2xl text-xl text-primary font-semibold'>Film<span
                        className='text-blue'
                    >
                        NET</span></p>
                </Link>
                <div className="text-xl px-4 py-1 cursor-pointer" ref={toggleRef} 
                onClick={() => setActiveMobile(!activeMobile)}>
                    <FontAwesomeIcon icon={faBars} className="pointer-events-none"/>
                </div>
            </div>
            <Sidebar 
            activeMobile={activeMobile}
            setActiveMobile={setActiveMobile}
            toggleRef={toggleRef}
            />
            <div className="lg:ml-[20vw] md:ml-[12vw] ml-0">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/:category/:id' element={<MovieDetail />}/>
                    <Route path='/explore' element={<Explore />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout