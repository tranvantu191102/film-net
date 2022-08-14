import React, {useState, useContext} from 'react'
import Select from 'react-select';

import { CategoryContext } from '../../contexts/CategoryContext';

const SortExplore = () => {

    const options = [
        { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Most rating" },
    { value: "release_date.desc", label: "Most recent" },
    ]

    const [valueSort, setValueSort] = useState(options[0])
    const { setSortBy} = useContext(CategoryContext)
   
    const customStyles = {
        control: (styles) => ({
          ...styles,
          backgroundColor: "#49494b",
          boxShadow: "none",
          border: 0,
        }),
        option: (
          styles,
          { data, isDisabled, isFocused, isSelected }
        ) => ({
          ...styles,
          backgroundColor: isSelected ? "rgb(51,51,53)" : "rgb(51,51,53)", 
          cursor: 'pointer'
        }),
    
        singleValue: (provided) => {
          return { ...provided, color: "white" };
        },
    
        menu: (styles) => ({
          ...styles,
          backgroundColor: "rgb(51,51,53)",
          padding: 0
        }),
        menuList: (styles) => ({
            ...styles,
            padding: 0,
            borderRadius: '4px',
            backgroundColor: "rgb(51,51,53)",
        })
      };

      const handleSelectSortBy = (e) => {
        setValueSort(e)
        setSortBy(e)
      }


  return (
    <div className='bg-gray-bg text-primary w-[90%] md:w-[40%] px-5 py-2 rounded-xl'>
        <p className='text-base font-semibold py-2'>Sort</p>

        <div className="border-t-[1px] border-gray-text py-3">
        <Select 
         defaultValue={valueSort}
         options={options}
         styles={customStyles}
         onChange={(e) =>handleSelectSortBy(e)}
        />
    </div>
    </div>
  )
}

export default SortExplore