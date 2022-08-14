import React from 'react'

const MovieInfo = ({ movie }) => {
  return (
    <div className='text-primary'>
      <div className="tw-flex-center w-full">
        <p className='text-xl font-semibold mt-8 '>{movie.tagline}</p>
      </div>
      <div className="ml-5 mt-5 text-xl font-semibold">STORY</div>
      <div className="ml-5 mt-2 w-[90%] text-gray-text font-normal">{movie.overview}</div>
      <div className="ml-5 mt-5 text-xl font-semibold">DETAILS</div>
      <div className="ml-5 mt-2 w-[90%] text-gray-text font-normal">
        <p>{`Status: ${movie.status}`}</p>
        <p>{`Release date: ${movie.release_date || movie.first_air_date}`}</p>
        <p>
          Spoken language:
          {
            movie.spoken_languages.map((item, index) => (
              <span key={index}>{` ${item.english_name}${index + 1 < movie.spoken_languages.length ? ', ' : ''}`}</span>
            ))
          }
        </p>
      </div>
    </div>
  )
}

export default MovieInfo