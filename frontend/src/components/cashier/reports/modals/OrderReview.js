import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import {fetchOrderById, fetchItemsByOrderId} from '../../../../http/orderAPI'
import PuffLoader from "react-spinners/PuffLoader";
import {observer} from "mobx-react-lite";
import GetName from "../../order/GetName";

import {
    InformationCircleIcon,
    XIcon,
} from '@heroicons/react/outline'

import OrderedItems from "./OrderedItems";

const OrderReview = observer(({orderId}) => {

    const [isOpen, setIsOpen] = useState(false)

    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(false);
    const [orderedItems, setOrderedItems] = useState([])


    useEffect(() => {
        setLoading(true)
        fetchOrderById(orderId).then(data => setOrderData(data))
        fetchItemsByOrderId(orderId).then(data => setOrderedItems(data))
        setLoading(false)
    }, [])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    if (loading) {
        return (
            <div className="flex justify-center">
                <PuffLoader size={45} color='#15803d'/>
            </div>
        )
    }

    const getPaymentMethod = (paymentMethod) => {
        if (paymentMethod === 'card') {
            return (
                <p>
                    Card Payment
                </p>
            )
        }
        if (paymentMethod === 'cash') {
            return (
                <p>
                    Cash Payment
                </p>
            )
        }
    }


    const getOrderComment = (comment) => {
        if (comment === '') {
            return (
                <p>* no comment</p>
            )
        } else {
            return (
                <p>{comment}</p>
            )
        }
    }

    const getDate = (date) => {
        const d = new Date(date);
        return d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString()
    }

    return (
        <div>
            <span className="relative z-0 inline-flex items-center">
                <button onClick={openModal}
                        className="relative inline-flex  px-3 py-1.5 rounded-md border border-green-400 bg-green-300 text-sm font-medium text-green-900 hover:bg-green-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-600">
                  <InformationCircleIcon className="h-5 w-5"/>
                </button>

              </span>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed bg-gray-500 bg-opacity-30  inset-0"/>
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        />
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full md:w-1/2 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-green-900"
                                >
                                    Information about order
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                                        <div className="max-w-4xl mx-auto">
                                            <div className="bg-green-50 shadow overflow-hidden sm:rounded-lg">

                                                <div className="border-t border-green-100">
                                                    <dl>
                                                        <div
                                                            className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Sale number
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                #{orderData.id}
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Cashier name
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                <GetName userId={orderData.userId}/>
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Payment Method
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {getPaymentMethod(orderData.paymentMethod)}
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Comment to the sale
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {getOrderComment(orderData.comment)}
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Sale creation date
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {getDate(orderData.createdAt)}
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Sale update date
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {getDate(orderData.updatedAt)}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                            {orderedItems.map(item =>
                                                <OrderedItems itemInfo={item}/>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        className="relative inline-flex items-center px-1.5 py-1.5 border border-transparent shadow-sm text-sm rounded-md text-red-100 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-red-800"
                                        onClick={closeModal}
                                    >
                                        <XIcon className="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
});

export default OrderReview;