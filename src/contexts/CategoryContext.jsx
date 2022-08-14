import React, { useState } from 'react'
import { createContext } from "react";

export const CategoryContext = createContext()


const CategoryContextProvider = ({ children }) => {

    const [category, setCategory] = useState('movie')
    const [sortBy, setSortBy] = useState({ value: "popularity.desc", label: "Most popular" })
    const [genre, setGenre] = useState({
        id: null,
        name: ''
    })

    const value = { 
        category,
         setCategory,
         sortBy,
         setSortBy,
         genre,
         setGenre
         }

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider