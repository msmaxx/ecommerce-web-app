import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import CSO from "./cashier/cart/CartSlideOver/CSO";
import {Context} from "../index";
import {TrashIcon} from "@heroicons/react/solid";
import {deleteCartItem, fetchCartItemsById} from "../http/cartAPI";
import toast from "react-hot-toast";

const Footer = observer(() => {

    const {cart} = useContext(Context)
    const {order} = useContext(Context)
    const {user} = useContext(Context)

    const clearCart = async () => {
        for (let i = 0; i < cart.items.length; i++) {
            await deleteCartItem(cart.items[i].id)
        }
        await fetchCartItemsById(user.id).then(cartItems => {
            cart.setCartItems(cartItems)
        })
    }

    const clearOrderData = () => {
        order.setPaymentMethod(null)
        order.setPaymentStatus(null)
        order.setTotalPrice(null)
        order.setStatus(null)
        order.setAllowed(false)
        order.setItems([])
    }

    const clearCartData = () => {
        cart.setTotalPrice(0.00)
    }

    const clearSale = () => {
        clearCart().then(clearOrderData).finally(clearCartData)
        toast.success(' Current sale successfully cleared! ',
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
            <div className="bg-green-700 backdrop-filter backdrop-blur-lg bg-opacity-70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="-ml-2 mr-2 flex items-center md:hidden">
                            </div>
                            <div className="flex-shrink-0 flex items-center">
                                <a className="text-lg text-green-100">Subtotal: {cart.totalPrice}€</a>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => clearSale()}
                                    className="relative inline-flex items-center px-1.5 py-1.5 mr-1.5 border border-transparent shadow-sm text-sm rounded-md text-red-100 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-red-800"
                                >
                                    <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                    <span>Clear sale</span>
                                </button>
                            </div>
                            <div className="flex-shrink-0">
                                <CSO/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Footer;