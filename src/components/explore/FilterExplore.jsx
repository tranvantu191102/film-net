import React, {useState, useEffect, useContext} from 'react'
import {getApi} from '../../api/api'
import { CategoryContext } from '../../contexts/CategoryContext'

const FilterExplore = () => {

  const [genres, setGenres] = useState([])
  const {category,setGenre, genre} = useContext(CategoryContext)

  useEffect(() => {
    const getGenres = async () => {
      const res = await getApi.getGenres(category)
      setGenres(res.data.genres)
    }

    getGenres()
  }, [category])

  const handleSetGenre = (genre) => {
    setGenre(genre)
  }

  return (
    <div className='bg-gray-bg text-primary w-[90%] md:w-[55%] mt-4 md:mt-0 px-5 py-1 rounded-xl'>
      <p className='text-base font-semibold py-2'>Filter</p>
     <div className="border-t-[1px] border-gray-text flex items-center flex-wrap py-3 h-[100px] md:h-[70px] overflow-auto">
     {
        genres && genres.length > 0 &&
        genres.map((item, index) => (
          <div className="mr-2 mb-3 cursor-pointer" key={index}
          onClick={() =>handleSetGenre(item)}
          >
            <span className={`px-3 py-1 border-[1px] border-gray-text rounded-lg hover:bg-primary-bg 
            ${genre.id === item.id ? 'bg-primary-bg ' :''}`}>
              {item.name}</span>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default FilterExplore