import React, {useContext, useState, useEffect} from 'react'
import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/solid'
import NavBar from "../components/NavBar";
import {observer} from "mobx-react-lite";
import OrderItems from "../components/cashier/order/OrderItems";
import {Context} from "../index";
import {createOrder, createOrderItems} from "../http/orderAPI";
import {POS_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import toast from "react-hot-toast";
import {deleteCartItem, fetchCartItemsById} from "../http/cartAPI";


const paymentMethods = [
    {id: 'cash', title: 'Cash', description: 'Cash payment'},
    {id: 'card', title: 'Card', description: 'Payment by credit/debit card'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Order = observer(() => {
    const {user} = useContext(Context)
    const {cart} = useContext(Context)
    const {order} = useContext(Context)

    const history = useHistory()

    const [selectedPaymentMethod, setSelectedPayment] = useState(paymentMethods[0].id)
    const [changeAmount, setChangeAmount] = useState(0.00)
    const [processing, setProcessing] = useState(false);
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked);
        if (!checked) {
            order.setPaymentStatus('exactAmount')
            order.setComment('0.00')
        }
        if (checked) {
            order.setPaymentStatus('change')
        }
    }

    const handleClick = async () => {
        setProcessing(true);
        await createOrder({
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            totalPrice: order.totalPrice,
            comment: order.comment,
            status: 'COMPLETED',
            userId: user.id,
        }).then(async order => {
            for (let i = 0; i < cart.items.length; i++) {
                await createOrderItems({
                    userId: user.id,
                    itemId: cart.items[i].itemId,
                    price: cart.items[i].price,
                    amount: cart.items[i].amount,
                    orderId: order.id,
                })
            }
            await clearBasket().then(clearOrderData)
            toast.success('#' + order.id + ' ' + 'Sale created!',
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
            setProcessing(false)
            history.push(POS_ROUTE)
        })
    }

    const clearBasket = async () => {
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


    useEffect(() => {
        order.setPaymentMethod(selectedPaymentMethod)
    }, [])

    return (
        <div>
            <header className="sticky top-0 z-50"><NavBar/></header>
            <div>
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Checkout</h2>

                    <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={e => e.preventDefault()}>
                        <div>
                            <div>
                                <RadioGroup value={selectedPaymentMethod} onChange={setSelectedPayment}>
                                    <RadioGroup.Label className="text-lg font-medium text-green-100">Payment
                                        method</RadioGroup.Label>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        {paymentMethods.map((paymentMethod) => (
                                            <RadioGroup.Option
                                                key={paymentMethod.id}
                                                value={paymentMethod.id}
                                                className={({checked, active}) =>
                                                    classNames(
                                                        checked ? 'border-transparent' : 'border-green-800',
                                                        active ? 'ring-2 ring-green-900' : '',
                                                        'relative bg-green-700 border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                    )
                                                }
                                            >
                                                {({checked, active}) => (
                                                    <>
                                                        <div className="flex-1 flex">
                                                            <div className="flex flex-col">
                                                                <RadioGroup.Label as="span"
                                                                                  className="block text-sm font-medium text-green-100">
                                                                    {paymentMethod.title}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description
                                                                    as="span"
                                                                    className="mt-1 flex items-center text-sm text-green-200"
                                                                >
                                                                    {paymentMethod.description}
                                                                </RadioGroup.Description>
                                                            </div>
                                                        </div>
                                                        {checked ? <CheckCircleIcon
                                                            className="h-5 w-5 text-green-300"/> : null}
                                                        <div
                                                            className={classNames(
                                                                active ? 'border' : 'border-2',
                                                                checked ? 'border-green-700' : 'border-transparent',
                                                                'absolute -inset-px rounded-lg pointer-events-none'
                                                            )}
                                                        />
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="mt-10 border-t border-green-700 pt-10">
                                <h2 className="text-lg font-medium text-green-100">Payment details</h2>
                                {selectedPaymentMethod === 'cash' ?
                                    <>
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-green-50">
                                                The amount of cash issued by the buyer:
                                            </label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div
                                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-green-700 sm:text-sm">€</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    value={changeAmount}
                                                    disabled={checked}
                                                    min='0,01'
                                                    onChange={e => {
                                                        setChangeAmount(e.target.value)
                                                        order.setPaymentStatus('change')
                                                        order.setComment(`client cash: ${e.target.value} / change: ${parseFloat(parseFloat(e.target.value) - cart.totalPrice).toFixed(2)}`)
                                                    }
                                                    }
                                                    onFocus={() => {
                                                        setChangeAmount(0.00)
                                                        order.setPaymentStatus('change')
                                                        order.setComment(`client cash: ${0.00} / change: ${parseFloat(parseFloat(0) - cart.totalPrice).toFixed(2)}`)
                                                    }}
                                                    className="text-green-700 py-3 bg-green-200 block w-full pl-7 pr-12 placeholder-green-800 sm:text-sm border-green-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-green-700 focus:outline-none"
                                                    placeholder="0.00"
                                                    aria-describedby="price-currency"
                                                />
                                                <div
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                  <span className="text-green-700 sm:text-sm" id="price-currency">
                                                    EUR
                                                  </span>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center my-4 ьч">
                                                <input
                                                    type="checkbox"
                                                    className="bg-green-800 border-green-900 rounded focus:border-transparent focus:bg-green-800 text-green-100 focus:ring-1 focus:ring-offset-2 focus:ring-green-900"
                                                    checked={checked}
                                                    onChange={handleChange}

                                                />
                                                <span className="text-green-100 text-ьв font-medium px-3">The buyer gave the exact amount</span>
                                            </div>
                                            <p className="block mt-3 text-md font-bold text-green-50">
                                                Change to be given to the buyer:
                                            </p>
                                            <div
                                                className="animate-shimmer px-6 py-4 my-3 bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:400%_100%] border border-green-800 rounded-md">
                                                <div className="flex justify-center">
                                                    <p className="block text-md font-bold text-green-50">

                                                        {checked ?
                                                            <>{parseFloat(changeAmount).toFixed(2)}€</>
                                                            :
                                                            <>
                                                                {parseFloat(changeAmount) <= 0.00 ?
                                                                    <>Enter the amount issued by the client!</>
                                                                    :
                                                                    <>{parseFloat(parseFloat(changeAmount) - cart.totalPrice).toFixed(2)}€</>
                                                                }
                                                            </>
                                                        }

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <h1 className="text-md font-medium text-red-300">Card Payment currently not
                                        working!</h1>
                                }
                            </div>
                        </div>

                        <div className="mt-10 lg:mt-0">
                            <h2 className="text-lg font-medium text-green-50">Order summary</h2>

                            <div
                                className="mt-4 border border-green-700 bg-gradient-to-r from-green-600 to-green-700 backdrop-blur-lg shadow-xl rounded-lg shadow-sm">
                                <ul role="list" className="divide-y divide-green-900">
                                    {cart.items.map(item =>
                                        <OrderItems itemInfo={item}/>
                                    )}
                                </ul>
                                <dl className="border-t border-green-900 py-6 px-4 space-y-6 sm:px-6">
                                    {/*
                                    <div className="flex items-center justify-between">
                                        <dt className="text-md text-green-100">Current sale subtotal</dt>
                                        <dd className="text-md font-medium text-green-100">{cart.totalPrice}€</dd>
                                    </div>
                                    */}
                                    <div className="flex items-center justify-between">
                                        <dt className="text-base font-medium text-green-100">Current sale subtotal</dt>
                                        <dd className="text-base font-medium text-green-100">{cart.totalPrice}€</dd>
                                    </div>
                                </dl>

                                <div className="border-t border-green-900 py-6 px-4 sm:px-6">
                                    <button
                                        onClick={() => handleClick()}
                                        className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-green-100 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-400 focus:ring-green-500"
                                    >
                                        Confirm sale
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Order;