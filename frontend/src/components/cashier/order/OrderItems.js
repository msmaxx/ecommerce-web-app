import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchOneItem} from "../../../http/itemAPI";
import {ScaleLoader} from "react-spinners";

const OrderItems = observer(({itemInfo}) => {


    const [item, setItem] = useState({info: []})
    const [id] = useState(itemInfo.itemId)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOneItem(id).then(data => setItem(data))
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
        <li key={item.id} className="flex py-6 px-4 sm:px-6">
            <div className="flex-shrink-0">

                <img
                    src={process.env.REACT_APP_API_URL + item.image} alt={item.name} className="w-20 bg-gradient-to-l from-green-600 to-green-700 border border-green-900 rounded-md" />
            </div>

            <div className="ml-6 flex-1 flex flex-col">
                <div className="flex">
                    <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                            <a className="font-medium text-md text-green-100">
                                {item.name}
                            </a>
                        </h4>
                        <p className="mt-1 text-sm text-green-100">Amount: {itemInfo.amount}</p>
                    </div>

                </div>

                <div className="flex-1 pt-2 flex items-end justify-between">
                    <p className="mt-1 text-md font-medium text-green-100">{parseFloat(itemInfo.amount * item.price).toFixed(2)}€</p>
                </div>
            </div>
        </li>
    );
});

export default OrderItems;