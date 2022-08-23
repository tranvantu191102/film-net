import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ pageCurrent, totalPages, setPage }) => {

    const handleSetPage = (page) => {
        setPage(page)
    }
    return (
        <div className='w-full tw-flex-center'>
            <div className="w-[60%] flex items-center justify-center">
                <div className="text-primary px-4 py-2 border-[1px] border-primary rounded-full
                 hover:bg-primary hover:text-primary-bg transform transition-all duration-150 
                 ease-linear cursor-pointer"
                    onClick={() => handleSetPage(1)}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </div>
                <div className="text-primary flex items-center justify-center">
                    {
                        pageCurrent < 5 ? totalPages < 5 ?
                            <>
                                {
                                    Array(totalPages).fill(0).map((_, index) => (
                                        <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                ${pageCurrent === index + 1 ? 'bg-blue' : ''}`}
                                            onClick={() => handleSetPage(index + 1)}
                                            key={index}
                                        >
                                            {index + 1}</div>
                                    ))
                                }

                            </>
                            :
                            <>
                                {
                                    Array(5).fill(0).map((_, index) => (
                                        <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                        ${pageCurrent === index + 1 ? 'bg-blue' : ''}`}
                                            onClick={() => handleSetPage(index + 1)}
                                            key={index + 1}
                                        >
                                            {index + 1}</div>
                                    ))
                                }
                                <div className="">
                                    {
                                        totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                    }
                                    <span className='py-2 px-3 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'
                                        onClick={() => handleSetPage(totalPages)}>{totalPages}</span>
                                </div>
                            </>
                            :
                            pageCurrent > totalPages - 4 ?
                                <>
                                    <div className="">
                                        <span className='py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'
                                            onClick={() => handleSetPage(1)}>1</span>
                                        {
                                            totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                        }
                                    </div>
                                    {
                                        Array(5).fill(0).map((_, index) => (
                                            <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                        ${pageCurrent === totalPages - 4 + index ? 'bg-blue' : ''}`}
                                                onClick={() => handleSetPage(totalPages - 4 + index)}
                                                key={totalPages - 4 + index}
                                            >
                                                {totalPages - 4 + index}</div>
                                        ))
                                    }

                                </>
                                :
                                <>
                                    <div className="">
                                        <span className='py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'
                                            onClick={() => handleSetPage(1)}
                                        >1</span>
                                        {
                                            totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                        }
                                    </div>
                                    {
                                        Array(5).fill(0).map((_, index) => (
                                            <div className={`py-2 px-4 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue
                                        ${pageCurrent === pageCurrent - 2 + index ? 'bg-blue' : ''}`}
                                                onClick={() => handleSetPage(pageCurrent - 2 + index)}
                                            >
                                                {pageCurrent - 2 + index}</div>
                                        ))
                                    }
                                    <div className="">
                                        {
                                            totalPages > 6 && <span className='text-xl font-bold'>...</span>
                                        }
                                        <span className='py-2 px-3 rounded-full border-[1px] border-primary mx-2 cursor-pointer hover:bg-blue'
                                            onClick={() => handleSetPage(totalPages)}>{totalPages}</span>
                                    </div>
                                </>
                    }
                </div>
                <div className="text-primary px-4 py-2 border-[1px] border-primary rounded-full
                 hover:bg-primary hover:text-primary-bg transform transition-all duration-150 
                 ease-linear cursor-pointer"
                    onClick={() => handleSetPage(totalPages)}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </div>

            </div>
        </div>
    )
}

export default Pagination