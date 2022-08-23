import React, { useContext } from 'react'
import { CategoryContext } from '../../contexts/CategoryContext'

const Header = () => {

  const { category, setCategory } = useContext(CategoryContext)

  return (
    <div className="flex items-center justify-start lg:px-10 px-5 pt-0 md:pt-8 text-primary">
      <div className={`mr-7 text-2lg  font-semibold py-2 cursor-pointer relative before:absolute before:content-[""] before:top-full before:left-0 before:w-full
     before:scale-0  before:h-[2px] before:bg-second-bg hover:text-primary
      ${category === 'movie' ?
          'before:scale-100 before:transform before:transition-all before:duration-100 before:ease-linear' : 'text-gray-text'}`}
        onClick={() => setCategory('movie')}
      >
        Movie</div>
      <div className={`text-2lg font-semibold hover:text-primary  py-2 cursor-pointer relative before:absolute before:content-[""] before:top-full before:left-0 before:w-full before:scale-0  before:h-[2px] before:bg-second-bg ${category === 'tv' ?
        'before:scale-100 before:transform before:transition-all before:duration-100 before:ease-linear' : 'text-gray-text'}`}
        onClick={() => setCategory('tv')}
      >
        TV Show</div>
    </div>
  )
}

export default Header