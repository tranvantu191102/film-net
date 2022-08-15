import React from 'react'

const Skeleton = () => {
    return (
        <div>
            <div className="skeleton w-full h-[400px]"
            ></div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[200px] px-5 md:px-0 flex items-center justify-between md:justify-start flex-row md:flex-col ">
                    <div className="skeleton mt-5 md:mt-[200px] w-[100px] h-[100px]"></div>
                    <div className="skeleton mt-5 md:mt-[50px] w-[100px] h-[100px] "></div>
                </div>
                <div className="flex-1">
                    <div className="tw-flex-center w-full mt-10">
                        <span className='skeleton w-[400px] h-[10px]'></span>
                    </div>
                    <div className="ml-5 mt-10">
                        <div className="skeleton w-[100px] h-[20px] mb-10"></div>
                        <div className="skeleton w-[90%] h-[80px] mb-10"></div>
                        <div className="skeleton w-[100px] h-[20px] mb-10"></div>
                        <div className="skeleton w-[40%] h-[40px] mb-10"></div>
                        <div className="skeleton w-[100px] h-[20px] mb-10"></div>
                        <div className="flex items-center justify-start flex-wrap">
                            <div className="w-[45%] flex items-center mb-4">
                                <div className="skeleton w-24 h-24 rounded-full mr-4"></div>
                                <div className="">
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                    <div className="skeleton w-[10px] h-[10px]"></div>
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                </div>
                            </div>
                            <div className="w-[45%] flex items-center mb-4">
                                <div className="skeleton w-24 h-24 rounded-full mr-4"></div>
                                <div className="">
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                    <div className="skeleton w-[10px] h-[10px]"></div>
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                </div>
                            </div>
                            <div className="w-[45%] flex items-center mb-4">
                                <div className="skeleton w-24 h-24 rounded-full mr-4"></div>
                                <div className="">
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                    <div className="skeleton w-[10px] h-[10px]"></div>
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                </div>
                            </div>
                            <div className="w-[45%] flex items-center mb-4">
                                <div className="skeleton w-24 h-24 rounded-full mr-4"></div>
                                <div className="">
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                    <div className="skeleton w-[10px] h-[10px]"></div>
                                    <div className="skeleton w-[100px] h-[10px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skeleton