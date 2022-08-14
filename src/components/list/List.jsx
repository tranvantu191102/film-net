import React, {useState, useEffect, useContext} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'

import { getApi } from '../../api/api'
import { CategoryContext } from '../../contexts/CategoryContext'
import MovieCard from '../movie-card/MovieCard'

const List = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const {category,sortBy, genre} = useContext(CategoryContext)


    useEffect(() =>{
        const getData = async () => {
           try {
            let res
          if(category === 'movie'){
             res = await getApi.discover(category, {params:{
                sort_by: sortBy.value,
                with_genres: genre.id,
                page: 1
            }})
          }

          if(category === 'tv') {
            res = await getApi.discover(category, {params:{
                sort_by: sortBy.value,
                with_genres: genre.id,
                page: 1
            }})
        }

            setData(res.data.results)
           } catch (error) {
            console.log(error)
           }
        }

        getData()
    }, [sortBy, genre,category])


    useEffect(() =>{
      const getData = async () => {
         try {
          let res
        if(category === 'movie'){
           res = await getApi.discover(category, {params:{
              sort_by: sortBy.value,
              with_genres: genre.id,
              page
          }})
        }

        if(category === 'tv') {
          res = await getApi.discover(category, {params:{
              sort_by: sortBy.value,
              with_genres: genre.id,
              page
          }})
      }

          setData(data.concat(res.data.results))
         } catch (error) {
          console.log(error)
         }
      }

      getData()
  }, [page])

    console.log(data)


    const handleClickOnTop = () => {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  return (
    <div className='px-5 mt-10'>
        <InfiniteScroll 
        dataLength={data.length}
        next={() =>setPage(prev =>prev + 1)}
        hasMore={true}
        >
        <div className="flex items-center justify-between flex-wrap">
            {
                data && data.length > 0 &&
                data.map((item, index) => (
                  <div className="w-[45%] md:w-[30%] lg:w-[23%] mb-3" key={index}>
                      <MovieCard movie={item} category={category}/>
                  </div>
                ))
            }
        </div>
        </InfiniteScroll>
       {
        page > 1 &&
        <div className="fixed bottom-[30px] right-[30px] text-primary">
        <div className="text-2xl py-2 px-5 bg-second-bg text-second rounded-full cursor-pointer"
        onClick={handleClickOnTop}
        >
        <FontAwesomeIcon icon={faArrowUp}/>
        </div>
     </div>
       }
    </div>
  )
}

export default List