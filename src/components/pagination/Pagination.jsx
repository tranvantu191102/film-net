import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ pageCurrent, totalPages }) => {
    return (
        <div className='w-full tw-flex-center'>
            <div className="w-[60%] flex">
                <div className="text-primary px-4 py-2 border-[1px] border-primary rounded-full
                 hover:bg-primary hover:text-primary-bg transform transition-all duration-150 
                 ease-linear cursor-pointer">
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </div>
                <div className="text-primary flex items-center">
                    {
                        pageCurrent < 5 ?
                            <>
                                {
                                    Array(5).fill(0).map((_, index) => (
                                        <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                        ${pageCurrent === index + 1 ? 'bg-blue' : ''}`}>
                                            {index + 1}</div>
                                    ))
                                }
                                <div className="">
                                    {
                                        totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                    }
                                    <span className='py-2 px-3 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'>{totalPages}</span>
                                </div>
                            </>
                            :
                            pageCurrent > totalPages - 4 ?
                                <>
                                    <div className="">
                                        <span className='py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'>1</span>
                                        {
                                            totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                        }
                                    </div>
                                    {
                                        Array(5).fill(0).map((_, index) => (
                                            <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                        ${pageCurrent === totalPages - 4 + index ? 'bg-blue' : ''}`}>
                                                {totalPages - 4 + index}</div>
                                        ))
                                    }

                                </>
                                :
                                <>
                                    <div className="">
                                        <span className='py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'>1</span>
                                        {
                                            totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                        }
                                    </div>
                                    {
                                        Array(5).fill(0).map((_, index) => (
                                            <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                        ${pageCurrent === totalPages - 4 + index ? 'bg-blue' : ''}`}>
                                                {totalPages - 4 + index}</div>
                                        ))
                                    }
                                </>
                    }
                </div>
                <div className="text-primary px-4 py-2 border-[1px] border-primary rounded-full
                 hover:bg-primary hover:text-primary-bg transform transition-all duration-150 
                 ease-linear cursor-pointer">
                    <FontAwesomeIcon icon={faAnglesRight} />
                </div>

            </div>
        </div>
    )
}

export default Pagination