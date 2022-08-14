import React, { useContext, useEffect } from 'react'
import { CategoryContext } from '../contexts/CategoryContext'

import Slider from '../components/slider/Slider'
import MovieList from '../components/movie-list/MovieList'
import Header from '../components/header/Header'

const Home = () => {

    const { category } = useContext(CategoryContext)

    useEffect(() => {
        document.title = 'Home'
    }, [])

    return (
        <div className=' text-primary'>
            <Header />
            <Slider
            />
            <div className="lg:px-10 md:px-5 px-3">
                <h2 className='mt-10 mb-5 font-semibold text-2xl'>Popular</h2>
                <MovieList
                    type='popular'
                    category={category}
                />
            </div>
            {
                category === 'tv' &&
                <>
                    <div className="px-10">
                        <h2 className='mt-10 mb-5 font-semibold text-2xl'>On The Air</h2>
                        <MovieList
                            type='on_the_air'
                            category={category}
                        />
                    </div>
                </>
            }

            <div className="lg:px-10 md:px-5 px-3">
                <h2 className='mt-10 mb-5 font-semibold text-2xl'>Top Rated</h2>
                <MovieList
                    type='top_rated'
                    category={category}
                />
            </div>
            {
                category === 'movie' &&
                <>
                    <div className="px-10">
                        <h2 className='mt-10 mb-5 font-semibold text-2xl'>Up Coming</h2>
                        <MovieList
                            type='upcoming'
                            category={category}
                        />
                    </div>
                    <div className="px-10">
                        <h2 className='mt-10 mb-5 font-semibold text-2xl'>Now Playing</h2>
                        <MovieList
                            type='now_playing'
                            category={category}
                        />
                    </div>
                </>
            }

            <div className="w-full py-20 tw-flex-center"
            >
                <span className='w-full h-[1px] bg-gray-text m-auto'></span>
            </div>

        </div>
    )
}

export default Home