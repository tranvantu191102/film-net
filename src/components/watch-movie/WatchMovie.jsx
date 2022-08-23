import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from "swiper/react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../api/firebase';

import { CategoryContext } from '../../contexts/CategoryContext';
import { apiConfig } from '../../api/config'
import { getApi } from '../../api/api'
import Similar from '../movie-detail/Similar'
import _ from 'lodash'
import { AuthContext } from '../../contexts/AuthContext'

const WatchMovie = () => {

    const { category, id } = useParams()
    const [data, setData] = useState({})
    const [seasons, setSeasons] = useState({})
    const { setGenre } = useContext(CategoryContext)
    const { isLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const movieDetail = await getApi.getDetails(category, id)
            let seasonsDetail
            if (movieDetail && category === 'tv') {
                seasonsDetail = await getApi.getDetailSeasons(id, movieDetail.data.number_of_seasons)

            }

            setData(movieDetail.data)
            setSeasons(seasonsDetail?.data)

        }
        getData()
    }, [])

    useEffect(() => {
        document.title = data?.name || data?.title
    }, [data])

    const handleSearchGenre = (genre) => {
        setGenre(genre)
        navigate('/explore')
    }



    useEffect(() => {
        const saveHistory = async () => {
            if (!isLogin) {
                return
            }
            if (!_.isEmpty(data)) {
                const docRef = doc(db, 'history', `tmdb${category}${data.id}`)
                await setDoc(docRef, {
                    ...data,
                    category,
                    createAt: serverTimestamp()
                })
            }
        }
        saveHistory()
    }, [data])


    return (
        <div className="">

            <div className={`relative w-full min-h-[70vh] px-10 py-10`}>
                <iframe src={
                    category === 'movie' ? `${apiConfig.urlWatch}/${category}?id=${id}`
                        :
                        `${apiConfig.urlWatch}/${category}?id=${id}&s=1&e=1`
                }
                    frameborder="0"
                    title="Film Video Player"
                    allowFullScreen={true}
                    className='absolute top-0 left-0 w-full h-full'
                ></iframe>

            </div>
            {
                seasons && !_.isEmpty(seasons) &&
                <div className="px-5 mt-10 mb-5">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                    >
                        {
                            seasons?.episodes?.map((episode, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-primary-bg border-[1px] cursor-pointer hover:opacity-50
                                     border-gray-text py-2 rounded-xl flex flex-col items-center justify-center">
                                        <p className='text-primary text-base font-semibold'>{index + 1}</p>
                                        <img src={apiConfig.w185Img(episode.still_path)} alt=""
                                            className='min-h-[104px]' />
                                        <p className='text-primary text-base mt-2 limit-one-line '>{episode.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

            }
            <div className="px-5">
                <h3 className='text-2xl font-semibold text-primary mb-2'>
                    {data?.title || data?.name}</h3>
                <div className="flex items-center justify-start text-primary mt-3 mb-5">
                    <div className="mr-5 flex items-center justify-start text-xl">
                        <FontAwesomeIcon icon={faStar} className="text-blue mr-2" />
                        <div className="">{data?.vote_average?.toFixed(1)}</div>
                    </div>
                    <div className="flex items-center justify-start text-xl">
                        <FontAwesomeIcon icon={faCalendarDays} className="text-blue  mr-2" />
                        <div className="">{data?.first_air_date || data?.release_date}</div>
                    </div>
                </div>
                <div className="">
                    {
                        data?.genres?.map((genre, index) => (
                            <span className="text-primary bg-gray-bg px-5 py-2 border-[1px] border-gray-text 
                            rounded-lg mr-4 last:r-0 hover:opacity-80 cursor-pointer"
                                onClick={() => handleSearchGenre(genre)}
                                key={index}>{genre.name}</span>
                        ))
                    }
                </div>
                <div className="text-primary mt-5">
                    <h4 className='text-xl font-semibold'>Overview:</h4>
                    <p className='text-gray-text text-base'>{data?.overview}</p>
                </div>
            </div>
            <Similar
                category={category}
                id={id}
            />
        </div>
    )
}

export default WatchMovie