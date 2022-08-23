import React from 'react'
import { apiConfig } from '../../api/config'

const MovieCast = ({ casts }) => {
    return (
        <div className='text-primary'>
            <div className="ml-5 mt-5 text-xl font-semibold">CAST</div>
            <div className="flex items-center justify-between mx-5 flex-wrap mt-10">
                {
                    casts.map((item, index) => (
                        <div className="w-[40%] flex items-center justify-start mb-5" key={index}>
                            <img src={apiConfig.w185Img(item.profile_path)} alt=""
                                className='rounded-xl mr-2' />
                            <div className="">
                                <p className='text-blue text-2lg font-semibold'>{item.name}</p>
                                <span>as</span>
                                <p className='text-primary text-2lg font-semibold'>{item.character}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieCast