import React, {useEffect, useState} from 'react';
import {fetchOneItem} from '../../../../http/itemAPI'
import PuffLoader from "react-spinners/PuffLoader";


const OrderedItems = ({itemInfo}) => {

    const [itemData, setItemData] = useState([])

    const [loading, setLoading] = useState(false);

    const [id] = useState(itemInfo.itemId)

    useEffect(() => {
        setLoading(true)
        fetchOneItem(id).then(data => setItemData(data))
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center">
                <PuffLoader size={45} color='#fb8500'/>
            </div>
        )
    }

    return (
        <div className="bg-green-100 my-4 py-4 rounded-xl">
            <div className="max-w-lg mx-auto px-3">
                <ul className="divide-y divide-green-200" data-todo-x-max="1">

                    <li className="py-2">
                        <div className="flex space-x-3">
                            <img className="h-12 w-12" src={process.env.REACT_APP_API_URL + itemData.image}
                                 alt={itemData.name}/>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm text-green-900  font-medium">{itemData.name}</h3>
                                    <p className="text-sm text-green-900">{itemInfo.price}€</p>
                                </div>
                                <p className="text-sm text-green-900">
                                    {itemData.description}
                                </p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OrderedItems;