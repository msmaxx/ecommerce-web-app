import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {fetchAllOrders} from "../http/orderAPI";
import {ScaleLoader} from "react-spinners";
import moment from "moment";
import {
    CheckIcon,
    CreditCardIcon,
    CashIcon
} from "@heroicons/react/outline";
import GetName from "../components/cashier/order/GetName";
import OrderReview from "../components/cashier/reports/modals/OrderReview";

const Reports = () => {
    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchAllOrders().then(data => setOrderData(data))
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
        if (status === 'COMPLETED') {
            return (
                <div>
                <span
                    className="inline-flex items-center px-2.5 rounded-full text-xs font-medium bg-green-300 text-green-900 border border-green-700">
                    COMPLETED <CheckIcon className='w-4 h-4 ml-2'/>
                </span>
                </div>
            )
        }
    }

    const isDescending = true;
    const sortedOrders = orderData.sort((a, b) => isDescending ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const stats = [
        { name: 'Total sales', stat: orderData.length },
        { name: 'Sales turnover (€)', stat: orderData.reduce((a,v) =>  a = a + v.totalPrice , 0).toFixed(2)},
    ]

    return (
        <div>
            <header className="sticky top-0 z-50"><NavBar/></header>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-3">
                <dl className="mt-5 py-4 px-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {stats.map((item) => (
                        <div key={item.name} className="px-4 py-5 bg-green-200 border border-green-500 shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-bold text-green-800 truncate">{item.name}</dt>
                            <dd className="mt-1 text-3xl font-medium text-green-900">{item.stat}</dd>
                        </div>
                    ))}
                </dl>
                <div className="flex flex-col">
                    <div className="-my-2 px-4 overflow-x-auto rounded-lg sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-green-400">
                                    <thead className="bg-green-600">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Cashier
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Sum
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Sale date
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Quick View</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-green-200 divide-y divide-green-400">
                                    {sortedOrders.map(order =>
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-green-900">
                                                #{order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                <GetName userId={order.userId}/>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap items-center text-sm font-bold text-green-900">
                                                <div className='container '>
                                                    {order.paymentMethod === 'card' ?
                                                        <div className='text-sm flex justify-star items-center'>
                                                            <CreditCardIcon
                                                                className='inline-flex w-4 h-4 mr-2'/> {order.totalPrice.toFixed(2)}€
                                                        </div>
                                                        :
                                                        <div className='text-sm my-3 flex justify-star'>
                                                            <CashIcon
                                                                className='inline-flex w-4 h-4 mr-2'/> {order.totalPrice.toFixed(2)}€
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {getStatus(order.status, order.id)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {moment(order.createdAt).format('DD/MM/YY HH:mm')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <OrderReview orderId={order.id}/>
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

export default Reports;