import React, {useEffect, useState} from 'react';
import {fetchCategoryById} from "../../../http/itemAPI";
import {ScaleLoader} from "react-spinners";


const GetCategoryName = ({categoryId}) => {

    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchCategoryById(categoryId).then(data => setCategoryData(data))
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#15803d'/>
            </div>
        )
    }

    return (
        <div>
            <p>{categoryData.name}</p>
        </div>
    );
};

export default GetCategoryName;