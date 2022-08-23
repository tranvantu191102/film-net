import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../api/firebase';

import Input from '../login/Input'

const EditAccount = ({ name, data, className, onChange, user }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleUpdateUsername = async () => {

        setLoading(true)
        const userRef = doc(db, 'users', user.id)
        await updateDoc(userRef, {
            ...user,
            username: data
        })
        setIsEdit(false)
        setLoading(false)
    }
    return (
        <div className={` flex items-center justify-between pr-5 ${className}`}>
            <div className="">
                <h4 className='text-xl text-primary font-semibold'>{name}</h4>
                {isEdit ?
                    <div className=" text-primary mt-5">
                        <Input
                            type="text"
                            label="Name"
                            value={data}
                            onChange={onChange}
                        />
                    </div> :
                    <p className='text-base text-gray-text font-semibold'>{data}</p>}
            </div>
            <div className="text-primary text-xl cursor-pointer">
                {
                    loading ?
                        <div className=" flex items-center justify-center py-1 bg-gray-bg text-blue rounded-md px-2">
                            <svg className="animate-spin h-5 w-5  ... text-white-text "
                                viewBox="0 0 24 24">
                                <FontAwesomeIcon icon={faSpinner} />
                            </svg>
                        </div> :
                        isEdit ? <FontAwesomeIcon icon={faCircleXmark} onClick={handleUpdateUsername} /> :
                            <FontAwesomeIcon icon={faPen} onClick={() => setIsEdit(true)} />
                }
            </div>
        </div>
    )
}

export default EditAccount