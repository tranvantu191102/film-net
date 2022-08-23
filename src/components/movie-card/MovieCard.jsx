import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { apiConfig } from '../../api/config'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie, category }) => {

    return (
        <Link to={`/${category}/${movie.id}`}
            className="overflow-hidden group">
            <div className='relative text-primary'>
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={apiConfig.w500Img(movie.poster_path)} alt=""
                        className='rounded-lg group-hover:opacity-80 min-h-[200px] md:min-h-[300px] lg:min-h-[340px] group-hover:scale-110 transform transition-all duration-200 ease-linear '
                    />
                </div>
                <p className='limit-one-line text-2lg font-semibold w-full my-2'>{movie.title || movie.name}</p>
                <div className='absolute top-2 left-1 px-2 py-1 bg-blue rounded-lg inline-block text-lg'>
                    <span className='mr-1'>{movie.vote_average}</span>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </div>
        </Link>
    )
}

export default MovieCard