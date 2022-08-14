import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faShareNodes, faHeart, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

import { apiConfig } from '../../api/config'
import { getApi } from '../../api/api'
import MovieInfo from './MovieInfo'



const MovieDetail = () => {

    const [data, setData] = useState({})

    const { category, id } = useParams()

    useEffect(() => {
        const getData = async () => {
            const resDetail = await getApi.getDetails(category, id)
            const resVideo = await getApi.getVideos(category, id)

            console.log(resVideo)
            setData(resDetail.data)
            try {
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])


    console.log(data)
    return (
        data && !_.isEmpty(data) &&
        <div>
            <div className="relative w-full h-[400px] bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${apiConfig.originalImg(data.backdrop_path)})` }}
            >
                <img src={apiConfig.originalImg(data.poster_path)} alt=""
                    className='absolute -bottom-20 left-0 w-[200px] z-[99] rounded-xl' />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-gradient-to-l from-[rgba(0,0,0,0.6)] to-transparent"></div>
                <div className="ml-[200px] px-[50px] flex items-center justify-between absolute bottom-20 left-0 right-0 text-primary">
                    <div className="">
                        <h2 className='text-3xl font-bold text-primary'>{data.title || data.name}</h2>
                        <div className="w-full flex items-center justify-start flex-wrap mt-4">
                            {
                                data.genres.map((item) => (
                                    <div className="px-4 py-2 cursor-pointer border-[1px] border-primary mr-4 rounded-xl hover:opacity-50"
                                        key={item.id}>{item.name}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='px-7 py-3 bg-blue text-xl text-primary font-semibold
            rounded-3xl tw-flex-center cursor-pointer hover:text-2xl transition-all duration-200 ease-linear'>
                        <FontAwesomeIcon icon={faPlay} className='mr-4' />
                        <p className=''
                        >WATCH</p>
                    </div>
                </div>
                <div className="absolute top-5 right-0 text-primary tw-flex-center">
                    <div className="text-xl px-3 py-2 border-[2px] border-primary rounded-full transform mr-4 cursor-pointer hover:text-blue hover:-translate-y-3 hover:border-blue transition-all duration-200 ease-linear">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className="text-xl px-3 py-2 border-[2px] border-primary rounded-full transform mr-4 cursor-pointer hover:text-blue hover:-translate-y-3 hover:border-blue transition-all duration-200 ease-linear">
                        <FontAwesomeIcon icon={faShareNodes} />
                    </div>
                    <div className="text-xl px-3 py-2 border-[2px] border-primary rounded-full transform mr-4 cursor-pointer hover:text-blue hover:-translate-y-3 hover:border-blue transition-all duration-200 ease-linear">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-[200px] text-center text-primary pt-[200px] border-r-[1px] border-gray-text">
                    <div className="">
                        <div className='text-xl font-semibold'>RATING</div>
                        <div className='text-xl font-normal border-[4px] border-blue rounded-full p-5 mt-2 inline-block'
                        >{data.vote_average.toFixed(1)}</div>
                    </div>
                    <div className="mt-20">
                        <span className='text-xl font-semibold'>RUNTIME</span>
                        <div className="text-xl font-normal mt-3">{`${data.runtime} M`}</div>
                    </div>
                </div>
                <div className="flex-1">
                    <MovieInfo />
                </div>
            </div>
        </div>
    )
}

export default MovieDetail