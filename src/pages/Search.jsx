import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CategoryContext } from '../contexts/CategoryContext'
import _ from 'lodash'

import Header from '../components/header/Header'
import { getApi } from '../api/api'
import MovieCard from '../components/movie-card/MovieCard'
import Pagination from '../components/pagination/Pagination'

const Search = () => {

    const [keyword, setKeyword] = useState('')
    const [resultsSearch, setResultsSearch] = useState({})
    const [page, setPage] = useState(resultsSearch?.page || 1)
    const { category } = useContext(CategoryContext)

    useEffect(() => {
        document.title = 'Search'
    }, [])

    const handleOnChangeKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (keyword) {
            const res = await getApi.search(category, {
                params: {
                    query: keyword
                }
            })

            setResultsSearch(res.data)
        }
    }

    return (
        <div>
            <Header />
            <div className="h-[calc(100vh-75px)]">
                {
                    _.isEmpty(resultsSearch) && <div className="w-full tw-flex-center text-primary pt-16">
                        <h2 className='text-2xl font-semibold'>Find your favourite movies, TV shows, people and more</h2>
                    </div>
                }
                <div className="w-full tw-flex-center text-primary mt-8 ">
                    <form className="w-[60%] px-6 py-1 bg-gray-bg rounded-3xl"
                        onSubmit={handleSearch}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl pr-4" />
                        <input
                            type="text"
                            value={keyword}
                            placeholder='Search...'
                            className='py-4 bg-transparent outline-none border-none placeholder:text-xl text-xl'
                            onChange={(e) => handleOnChangeKeyword(e)}
                        />
                    </form>
                </div>
                <div className="flex items-center justify-between flex-wrap bg-primary-bg px-5 mt-10">
                    {
                        resultsSearch.results && resultsSearch.results.length > 0 &&
                        resultsSearch.results.map((item, index) => (
                            <div className="w-[45%] md:w-[30%] lg:w-[23%] mb-3" key={index}>
                                <MovieCard movie={item} category={category} />
                            </div>
                        ))
                    }
                    <Pagination
                        pageCurrent={18}
                        totalPages={20}
                        setPage={setPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search