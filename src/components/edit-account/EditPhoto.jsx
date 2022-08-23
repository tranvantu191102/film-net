import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore'
import { storage, db } from '../../api/firebase'

import userImage from '../../assets/user.png'

const EditPhoto = ({ data }) => {

    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState("")
    const [loading, setLoading] = useState(false)

    const hanldeOnChangeImage = (e) => {
        setImage(e.target.files[0])
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setImageURL(objectUrl)
    }

    const handleUpdatePhoto = async () => {
        if (!image) return
        setLoading(true)
        const storageRef = ref(storage, `profiles/${image.name}`);
        const snap = await uploadBytes(storageRef, image)
        const photoPath = snap.ref.fullPath
        const photoURL = await getDownloadURL(ref(storage, snap.ref.fullPath))
        const userRef = doc(db, 'users', data.id)
        await updateDoc(userRef, {
            ...data,
            photoURL,
            photoPath
        })
        setLoading(false)
    }

    return (
        <div className="w-[100%] md:w-[35%]">
            <h2 className='text-2xl text-primary font-semibold'>Profile Photo</h2>
            <div className="flex flex-col items-center justify-center">
                <img src={data?.photoURL || imageURL || userImage}
                    alt=""
                    className='w-[200px] h-[200px] md:w-[220px] md:h-[220px]  lg:w-[250px] lg:h-[250px] rounded-full border-[1px] border-gray-text mt-10'
                />
                <div className="mt-5">
                    <label htmlFor='upload-photo'
                        className="text-xl text-primary cursor-pointer border-[1px] border-gray-text px-3
                 py-1 rounded-lg hover:bg-gray-bg transition-all duration-100 ease-linear">
                        <FontAwesomeIcon icon={faArrowUpFromBracket} className="mr-3" />
                        <span>Upload new photo</span>
                    </label>
                    <input type="file"
                        hidden id="upload-photo" accept=".png, .jpg, .jpeg"
                        onChange={(e) => hanldeOnChangeImage(e)}
                    />

                </div>
                <button className='px-6 py-2 border-[1px]  mb-10 md:mb-0 border-gray-text text-blue font-semibold mt-5 rounded-xl'
                    onClick={handleUpdatePhoto}
                >{loading ?
                    <div className="w-full flex items-center justify-center py-1 bg-blue-text rounded-md">
                        <svg className="animate-spin h-5 w-5 ... text-white-text" viewBox="0 0 24 24">
                            <FontAwesomeIcon icon={faSpinner} />
                        </svg>
                    </div>
                    :
                    "Update photo"
                    }</button>
            </div>
        </div>
    )
}

export default EditPhoto