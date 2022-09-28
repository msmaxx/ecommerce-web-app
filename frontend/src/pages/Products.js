import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {fetchAllItems} from "../http/itemAPI";
import {ScaleLoader} from "react-spinners";
import GetCategoryName from "../components/cashier/products/GetCategoryName";
import ItemReview from "../components/cashier/products/modals/ItemReview";

const Products = () => {

    const [itemsData, setItemsData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchAllItems().then(data => setItemsData(data))
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#15803d'/>
            </div>
        )
    }

    const getStatus = (status) => {
        if (status === 'TRUE') {
            return (
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-300 text-green-900">
                    Active
                </span>
            )
        } else {
            return (
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-300 text-red-900">
                    Not active
                </span>
            )
        }
    }


    return (
        <div>
            <header className="sticky top-0 z-50"><NavBar/></header>
            <div className="max-w-7xl py-6 mx-auto sm:px-6 lg:px-3">
                <div className="flex flex-col">
                    <div className="-my-2 px-4 overflow-x-auto rounded-lg sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-green-400">
                                    <thead className="bg-green-600">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Product status
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="bg-green-200 divide-y divide-green-400">
                                    {itemsData.map(item =>
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full"
                                                             src={process.env.REACT_APP_API_URL + item.image} alt={itemsData.name}/>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-green-900">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-sm font-medium text-green-900">
                                                            <p className='w-32 truncate'>{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-green-900">
                                                {item.price.toFixed(2)}€
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatus(item.active)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {item.quantity} pcs.
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                <GetCategoryName categoryId={item.categoryId}/>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <ItemReview itemId={item.id}/>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;