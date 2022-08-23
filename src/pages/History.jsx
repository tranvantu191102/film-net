import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../api/firebase';

import HeaderPersonal from '../components/header/HeaderPersonal'
import MovieCard from '../components/movie-card/MovieCard';
import errorImg from '../assets/error.png'


const History = () => {
    const [category, setCategory] = useState('all')
    const [data, setData] = useState([])

    useEffect(() => {
        document.title = 'History'
    }, [])

    useEffect(() => {
        try {
            const getData = async () => {
                if (category === 'all') {
                    const docRef = collection(db, 'history')
                    const querySnapshot = await getDocs(docRef);
                    const results = []
                    querySnapshot.forEach((doc) => {
                        results.push(doc.data())
                    });
                    setData(results)
                } else {
                    const docRef = query(collection(db, 'history'), where('category', '==', category))
                    const querySnapshot = await getDocs(docRef);
                    const results = []
                    querySnapshot.forEach((doc) => {
                        results.push(doc.data())
                    });
                    setData(results)
                }

            }
            getData()
        } catch (error) {
            console.log(error)
        }
    }, [category])
    return (
        <div>
            <HeaderPersonal
                setCategory={setCategory}
                category={category}
            />
            <div className="">
                {data?.length === 0 ?
                    <div className='flex flex-col items-center justify-center  h-[calc(100vh-75px)]'>
                        <img src={errorImg} alt="" clas />
                        <p className='text-primary text-2xl font-semibold'>There are no movies</p>
                    </div>
                    :
                    <div className={`flex items-center ${data?.length > 4 ? 'justify-between' : 'justify-start'}  flex-wrap px-5 pt-5 min-h-[calc(100vh-75px)]`}>
                        {
                            data?.length > 0 &&
                            data.map((movie, index) => (
                                <div className="w-[45%] md:w-[30%] lg:w-[23%] mb-3 mr-4" key={index}>
                                    <MovieCard movie={movie} category={movie.category} />
                                </div>
                            ))
                        }
                    </div>
                }
            </div>

        </div>
    )
}

export default History