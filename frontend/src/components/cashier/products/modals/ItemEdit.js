import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import {PencilAltIcon, XIcon, UploadIcon} from "@heroicons/react/outline";
import {fetchCategories, fetchOneItem, updateItemData} from "../../../../http/itemAPI";
import {observer} from "mobx-react-lite";
import toast from "react-hot-toast";


const ItemEdit = observer(({itemId}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [itemData, setItemData] = useState('')

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchOneItem(itemId).then(data => setItemData(data))
        fetchCategories().then(data => setCategories(data))
    }, [])

    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemCategory, setItemCategory] = useState('')

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const editItem = () => {
        updateItemData(itemId, itemName, itemDescription, itemPrice, itemQuantity, itemCategory).then(closeModal)
        toast.success(itemName + ' successfully edited!',
            {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '1px solid #16a34a',
                    padding: '11px',
                    color: '#15803d',
                },
            }
        )
    }

    return (
        <div>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button onClick={openModal}
                        className="-ml-px relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-green-400 bg-green-300 text-sm font-medium text-green-900 hover:bg-green-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-600">
                    <PencilAltIcon className="h-5 w-5"/>
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
                                className="inline-block w-full md:w-1/2 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-green-900"
                                >
                                    Product editing (#{itemId})
                                </Dialog.Title>

                                <div className="mt-2">
                                    <div className="mt-5">
                                        <span className="text-green-900 text-sm font-normal">Product name</span>
                                        <input onChange={e => setItemName(e.target.value)}
                                               className="w-full px-4 py-1.5 mt-2 text-green-900 border-green-300 rounded-xl bg-green-100 focus:bg-green-100 focus:outline-none focus:ring-2 focus:border-green-300 focus:ring-green-200"
                                               type="text"
                                               placeholder="Product name"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <span className="text-green-900 text-sm font-normal">Product description</span>
                                        <textarea onChange={e => setItemDescription(e.target.value)}
                                                  className="w-full px-4 py-1.5 mt-2 text-green-900 border-green-300 rounded-xl bg-green-100 focus:bg-green-100 focus:outline-none focus:ring-2 focus:border-green-300 focus:ring-green-200"
                                                  rows="1"
                                                  placeholder="Product description"
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <span className="text-green-900 text-sm font-normal">Product price</span>
                                        <input onChange={e => setItemPrice(e.target.value)}
                                               className="w-full px-4 py-1.5 mt-2 text-green-900 border-green-300 rounded-xl bg-green-100 focus:bg-green-100 focus:outline-none focus:ring-2 focus:border-green-300 focus:ring-green-200"
                                               type="number"
                                               placeholder="Product price"
                                               defaultValue={parseFloat(itemData.price).toFixed(2)}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <span className="text-green-900 text-sm font-normal">Product quantity</span>
                                        <input onChange={e => setItemQuantity(e.target.value)}
                                               className="w-full px-4 py-1.5 mt-2 text-green-900 border-green-300 rounded-xl bg-green-100 focus:bg-green-100 focus:outline-none focus:ring-2 focus:border-green-300 focus:ring-green-200"
                                               type="number"
                                               placeholder="Product quantity"
                                               defaultValue={parseInt(itemData.quantity)}
                                        />
                                    </div>

                                    <div className="mt-2 ">
                                        <span className="text-green-900 text-sm font-normal">Product category</span>
                                        <select value={itemCategory} onChange={e => setItemCategory(e.target.value)}
                                                className="w-full px-4 py-1.5 mt-2 text-green-900 border-green-300 rounded-xl bg-green-100 focus:bg-green-100 focus:outline-none focus:ring-2 focus:border-green-300 focus:ring-green-200">
                                            <option>Choose from the list below</option>
                                            {categories.map(category =>
                                                <option key={category.id}
                                                        value={category.id}>{category.name} ({category.id})</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between mt-6">
                                    <button
                                        className=" inline-flex items-center px-1.5 py-1.5 border border-transparent shadow-sm text-sm rounded-md text-red-100 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-red-800"
                                        onClick={closeModal}
                                    >
                                        <XIcon className="h-5 w-5" aria-hidden="true"/>
                                    </button>

                                    <button
                                        className="relative inline-flex items-center px-1.5 py-1.5 border border-transparent shadow-sm text-sm rounded-md text-green-100 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-green-800"
                                        onClick={() => editItem()}
                                    >
                                        <UploadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                        <span>Update</span>
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

export default ItemEdit;
