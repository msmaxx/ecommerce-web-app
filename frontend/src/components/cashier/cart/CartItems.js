import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {fetchOneItem} from "../../../http/itemAPI";
import {ScaleLoader} from "react-spinners";
import {deleteCartItem, fetchCartItemsById} from "../../../http/cartAPI";
import toast from "react-hot-toast";

const CartItems = observer(({itemInfo}) => {

    const {user} = useContext(Context)
    const {cart} = useContext(Context)
    const {order} = useContext(Context)

    const [item, setItem] = useState({info: []})
    const [id] = useState(itemInfo.itemId)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            fetchOneItem(id).then(data => setItem(data))
        }

        fetchData().then(() => setLoading(false));
    }, []);

    const removeItemFromCart = async (cartItemId) => {
        await deleteCartItem(cartItemId).then(async () => {
            await fetchCartItemsById(user.cartId).then(data => {
                cart.setCartItems(data)
                order.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
                cart.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
            })
        })
        toast.success('Item successfully removed from the cart!',
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
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#15803d'/>
            </div>
        )
    }

    return (
        <li key={item.id} className="py-6 flex">
            <div
                className="flex-shrink-0 w-24 h-24 bg-gradient-to-l from-green-700 to-green-800 border border-green-900 rounded-md overflow-hidden">
                <img
                    src={process.env.REACT_APP_API_URL + item.image}
                    alt={item.name}
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
                <div>
                    <div
                        className="flex justify-between font-medium text-green-100">
                        <h3>
                            <a>{item.name}</a>
                        </h3>
                        <p className="ml-4 font-bold text-green-200">{parseFloat(itemInfo.amount * item.price).toFixed(2)}€</p>
                    </div>
                    <p className="mt-1 text-sm text-green-200">{item.description}</p>
                </div>
                <div
                    className="flex-1 flex items-end justify-between text-sm">
                    <p className="text-green-100">Amount: {itemInfo.amount}</p>

                    <div className="flex">
                        <button type="button"
                                onClick={() => removeItemFromCart(itemInfo.id)}
                                className="font-medium text-green-100 hover:text-green-200">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>

    );
});

export default CartItems;