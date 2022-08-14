import React, { useState, useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import { getApi } from '../../api/api'
import { apiConfig } from '../../api/config';
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';

const Slider = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { category } = useContext(CategoryContext)
    SwiperCore.use([Autoplay])

    useEffect(() => {
        const getData = async () => {

            try {
                setLoading(true)
                const response = await getApi.getList(category, 'popular', { params: 1 })
                setData(response.data.results.slice(0, 5))
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        getData()
    }, [category])



    return (
        <div className='mt-5 lg:px-10 px-5'>
          {
            !loading ?   <Swiper

            navigation={true}

            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000 }}
            className="mySwiper"
        >
            {
                data && data.length > 0
                && data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/${category}/${item.id}`} >
                            <div className="group relative bg-center bg-no-repeat w-full bg-cover rounded-lg lg:h-[60vh] md:h-[50vh] h-[40vh]"
                                style={{ backgroundImage: `url(${apiConfig.originalImg(item.backdrop_path)})` }}
                            >
                                <div className="absolute inset-0 w-full h-full bg-[rbga(0,0,0,0.5)] rounded-lg bg-gradient-to-r from-[#000] to-transparent px-2 md:px-10">
                                    <div className="flex items-center justify-between px-2 md:px-4 lg:py-6 py-2">
                                        <h3 className='text-blue text-2xl md:text-3xl font-bold w-[45%]'>{item.title || item.name}</h3>
                                        <div className='px-3 py-1 bg-blue rounded-2xl'>
                                            <span className='mr-2 '>{item.vote_average}</span>
                                            <FontAwesomeIcon icon={faStar} />
                                        </div>
                                    </div>
                                    <div className="text-2lg font-bold ">{item.original_title || item.original_name}</div>
                                    <div>
                                        <p className="text-gray-text font-semibold mt-2">
                                            {`Release date: ${item.release_date || item.first_air_date}`}
                                        </p>
                                    </div>
                                    <p className='w-[45%] mt-5 text-primary font-normal invisible md:visible limit-four-line'>
                                        {item.overview}
                                    </p>
                                </div>
                                <div className="absolute inset-0 rounded-lg w-full h-full group-hover:bg-[rgba(0,0,0,0.2)] transition-all duration-300 ease-linear z-99">
                                    <div className="absolute position-abs-center-xy invisible opacity-0 group-hover:visible group-hover:opacity-100
                                    transition-all duration-300 ease-linear
                                    ">
                                        <FontAwesomeIcon icon={faCirclePlay} className='text-[40px] md:text-[70px] bg-blue rounded-full text-primary' />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        :
        <div className="skeleton w-full lg:h-[60vh] md:h-[50vh] h-[40vh] rounded-lg">

        </div>
          }
        </div>
    )
}

export default Slider