import React, {useState, Fragment, useEffect} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import {InformationCircleIcon, XIcon} from "@heroicons/react/outline";
import ItemEdit from "./ItemEdit";
import {fetchOneItem} from "../../../../http/itemAPI";
import GetCategoryName from "../GetCategoryName";

const ItemReview = ({itemId}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [itemData, setItemData] = useState([])

    useEffect(() => {
        fetchOneItem(itemId).then(data => setItemData(data))
    }, [])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const getStatus = (status) => {
        if (status === 'TRUE') {
            return (
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">
                    Active
                </span>
            )
        } else {
            return (
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-300 text-red-800">
                    Not active
                </span>
            )
        }
    }

    return (
        <div>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button onClick={openModal}
                        className="relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-green-400 bg-green-300 text-sm font-medium text-green-900 hover:bg-green-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-600">
                  <InformationCircleIcon className="h-5 w-5"/>
                </button>
                <ItemEdit itemId={itemId}/>
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
                            <Dialog.Overlay className="fixed bg-gray-500 bg-opacity-30 inset-0"/>
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
                                className="inline-block w-full md:w-1/2 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-green-50 backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-green-900"
                                >
                                    Product information (#{itemId})
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
                                                                Product Name
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {itemData.name} (#{itemData.id})
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Product description
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {itemData.description}
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Product category
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                <GetCategoryName categoryId={itemData.categoryId}/>
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Product price
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {itemData.price}€
                                                            </dd>
                                                        </div>

                                                        <div
                                                            className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt className="text-sm font-medium text-green-900">
                                                                Product status
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-green-900 sm:mt-0 sm:col-span-2">
                                                                {getStatus(itemData.active)}
                                                            </dd>
                                                        </div>

                                                    </dl>
                                                </div>
                                            </div>
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
};

export default ItemReview;