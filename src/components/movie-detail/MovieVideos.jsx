import React from 'react'

const MovieVideos = ({ videos }) => {
    return (
        <div className='text-primary'>
            <div className="ml-5 mt-5 text-xl font-semibold">MEDIA</div>
            <div className="">
                {videos.map((item, index) => (
                    <div className="" key={index}>
                        <iframe src={`https://www.youtube.com/embed/${item.key}`} width='100%' height='500px' className='px-5 mt-10'></iframe>
                        <p className='text-2xl text-primary font-semibold ml-5 mt-2'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieVideos