import React from 'react'


import Header from '../components/header/Header'
import SortExplore from '../components/explore/SortExplore'
import FilterExplore from '../components/explore/FilterExplore'
import List from '../components/list/List'

const Explore = () => {


    return (
        <div className=''> 
            <Header />
            <div className="px-5 bg-inherit text-primary mt-8 flex items-center justify-between flex-col md:flex-row ">
                <SortExplore />
                <FilterExplore />
            </div>
            <List />
           
        </div>
    )
}

export default Explore