import React, {useEffect, useState} from 'react';
import {fetchUserData} from '../../../http/userAPI'
import PuffLoader from "react-spinners/PuffLoader";


const GetName = ({userId}) => {

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([])

    useEffect(() => {
        setLoading(true)
        fetchUserData(userId).then(data => setUserData(data))
        setLoading(false)
    },[])

    if (loading) {
        return (
            <div className="flex justify-center">
                <PuffLoader size={25} color='#15803d'/>
            </div>
        )
    }

    return (
        <>
            <p>{userData.name}</p>
        </>
    );
};

export default GetName;