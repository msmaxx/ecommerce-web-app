import React, {Fragment, useState, useContext, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {CurrencyEuroIcon, ArrowRightIcon} from "@heroicons/react/solid";
import {useHistory} from "react-router-dom";
import {fetchCartItemsById} from "../../../../http/cartAPI";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {ScaleLoader} from "react-spinners";
import CartItems from "../CartItems";
import {ORDER_ROUTE} from "../../../../utils/consts";

const CSO = observer(() => {

    const {user} = useContext(Context)
    const {cart} = useContext(Context)
    const {order} = useContext(Context)

    const history = useHistory()

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchData() {
            await fetchCartItemsById(user.cartId).then(data => {
                cart.setCartItems(data)
                order.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
                cart.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
            })
        }

        fetchData().then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#15803d'/>
            </div>
        )
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative inline-flex items-center px-1.5 py-1.5 ml-1.5 border border-transparent shadow-sm text-sm rounded-md text-green-100 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-green-800"
            >
                <CurrencyEuroIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                <span>Sale checkout</span>
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={setOpen}>
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-30 transition-opacity"/>
                        </Transition.Child>

                        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="w-screen max-w-md">
                                    <div
                                        className="h-full flex rounded-md flex-col border-green-800 bg-gradient-to-r from-green-700 to-green-800 border-solid border-2 shadow-xl overflow-y-scroll">
                                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-bold text-green-100">Current sale
                                                    products</Dialog.Title>
                                                <div className="ml-3 h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-green-500 hover:text-green-700"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    {cart.items.length !== 0 ?
                                                        <>
                                                            {cart.items.map(item =>
                                                                <ul role="list"
                                                                    className="-my-6 divide-y divide-green-900"
                                                                    key={item.id}>
                                                                    <CartItems itemInfo={item}/>
                                                                </ul>
                                                            )}
                                                        </>
                                                        :
                                                        <>
                                                            <div
                                                                className="flex justify-center text-md font-medium text-green-300">
                                                                <h3>
                                                                    <a>You haven't added items to sell yet!</a>
                                                                </h3>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-green-900 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-bold font-medium text-green-100">
                                                <p>Subtotal</p>
                                                <p>{cart.totalPrice}€</p>
                                            </div>
                                            <div className="mt-6">
                                                {cart.items.length !== 0 ?
                                                    <button
                                                        type="button"
                                                        onClick={() => history.push(ORDER_ROUTE)}
                                                        className="flex justify-center w-full items-center px-6 py-3 border border-transparent shadow-sm text-sm rounded-md text-green-100 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-green-800"
                                                    >
                                                        <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5 text-green-100"
                                                                        aria-hidden="true"/>
                                                        <span>COMPLETE THE SALE</span>
                                                    </button>
                                                    :
                                                    <button
                                                        type="button"
                                                        className="flex justify-center w-full items-center px-6 py-3 cursor-not-allowed border border-transparent shadow-sm text-sm rounded-md text-green-100 bg-green-500"
                                                    >
                                                        <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5 text-green-100"
                                                                        aria-hidden="true"/>
                                                        <span>COMPLETE THE SALE</span>
                                                    </button>
                                                }
                                            </div>
                                            <div
                                                className="mt-6 flex justify-center text-sm text-center text-green-400">
                                                <p>
                                                    or{' '}
                                                    <button
                                                        type="button"
                                                        className="text-green-500 font-medium hover:text-green-600"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Proceed with the sale<span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
});

export default CSO;
