import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getApi } from '../../api/api'
import { apiConfig } from '../../api/config';

const MovieList = ({ type, category }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const response = await getApi.getList(category, type, { params: 1 })
                setData(response.data.results)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        getData()
    }, [type, category])

    return (
        <div>
          {
            loading ?
             <div className="flex items-center overflow-hidden w-full">
              {
                window.innerWidth> 1024 ? <>
                  <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                </>
                : window.innerWidth > 768 ?
                <>
                  <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                </>
                :
                <>
                  <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                <div className="skeleton rounded-lg w-[45%] md:w-[30%] lg:w-[23%] min-h-[200px] md:min-h-[300px] lg:min-h-[340px] mr-3"></div>
                </>
              }
            </div>
            :
            <Swiper
            slidesPerView={window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : 2}
            spaceBetween={30}
            modules={[Pagination]}
            className="mySwiper"
        >
            {
                data && data.length > 0 &&
                data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/${category}/${item.id}`}
                            className="overflow-hidden group"
                        >
                            <div className='relative'>
                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={apiConfig.w500Img(item.poster_path)} alt=""
                                        className='rounded-lg group-hover:opacity-80 min-h-[200px] md:min-h-[300px] lg:min-h-[340px] group-hover:scale-110 transform transition-all duration-200 ease-linear '
                                    />
                                </div>
                                <p className='limit-one-line w-full my-2'>{item.title || item.name}</p>
                                <div className='absolute top-2 left-1 px-2 py-1 bg-blue rounded-lg inline-block text-lg'>
                                    <span className='mr-1'>{item.vote_average}</span>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            }
        </Swiper>
          }
        </div>
    )
}

export default MovieList