import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {ScaleLoader} from "react-spinners";
import {addItemToCart, fetchCartItemsById} from "../../../http/cartAPI";
import toast from "react-hot-toast";

const SaleProductList = observer(({categoryId}) => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])

    const {user} = useContext(Context)
    const {item} = useContext(Context)
    const {cart} = useContext(Context)
    const {order} = useContext(Context)

    useEffect(() => {
        async function fetchData() {
            setProducts(item.items.filter(item => item.categoryId === categoryId && item.active === 'TRUE'))
        }

        fetchData().then(() => setLoading(false))
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#15803d'/>
            </div>
        )
    }

    const refreshCartItems = async () => {
        const currentCartItems = await fetchCartItemsById(user.cartId)
        cart.setCartItems(currentCartItems)
        order.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
        cart.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
        setLoading(false)
    }

    const addToCart = async (product) => {
        try {
            await addItemToCart({
                price: parseFloat(product.price),
                amount: +1,
                cartId: parseFloat(user.cartId),
                userId: user.id,
                itemId: parseInt(product.id),
            }).then(
                toast.success(product.name + ' successfully added to cart!',
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
            ).finally(() => refreshCartItems())
        } catch (e) {
            toast.success(e.response.data.message,
                {
                    position: 'bottom-right',
                    duration: 2000,
                }
            )
        }
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-8 mt-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map(product =>
                    <a
                        key={product.id}
                        className="p-4 border border-green-800 bg-gradient-to-r from-green-700 to-green-800 backdrop-blur-lg shadow-xl rounded-xl hover:shadow-green-700/70 hover:border-green-700/50"
                    >
                        {product.quantity >= 1 ?
                            <>
                                <img className="h-60 w-60 mx-auto object-cover cursor-pointer"
                                     src={process.env.REACT_APP_API_URL + product.image}
                                     alt={product.name}
                                     onClick={() => addToCart(product)}/>
                            </>
                            :
                            <img className="h-60 w-60 mx-auto object-cover grayscale"
                                 src={process.env.REACT_APP_API_URL + product.image}
                                 alt={product.name}/>
                        }

                        <h3 className="mt-4 text-3xl font-bold text-green-100">{product.name}</h3>
                        <div
                            className="animate-shimmer px-6 py-4 my-3 bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:400%_100%] border border-green-800 rounded-xl">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-green-100">{product.price.toFixed(2)}€</p>
                                </div>
                                <div>
                                    {product.quantity >= 1 ?
                                        <p className="text-green-100">{product.quantity} pcs.</p>
                                        :
                                        <p className="text-red-500">OUT OF STOCK</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
});

export default SaleProductList;