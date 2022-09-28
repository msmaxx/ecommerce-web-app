import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {ScaleLoader} from "react-spinners";
import {fetchCartItemsById, fetchOneCart} from "./http/cartAPI";
import {Toaster} from 'react-hot-toast';


const App = observer(() => {

        const {user} = useContext(Context)
        const {cart} = useContext(Context)
        const {order} = useContext(Context)

        const [loading, setLoading] = useState(true)

        useEffect(() => {
            async function fetchData() {
                try {
                    await check().then(async checkData => {
                        user.setId(checkData.id)
                        user.setEmail(checkData.email)
                        user.setName(checkData.name)
                        user.setIsAuth(true)
                        user.setGuest('false')
                        checkData.role === "ADMIN" ? user.setAdmin(true) : user.setAdmin(false)
                        fetchOneCart(user.id).then(cartData => user.setCartId(cartData.id)).then(async () => {
                            await fetchCartItemsById(user.cartId).then(data => {
                                cart.setCartItems(data)
                                order.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
                                cart.setTotalPrice(cart.items.reduce((a, x) => (a += x.price * x.amount), 0).toFixed(2))
                            })
                        })
                    })
                } catch (e) {
                    user.setGuest('true')
                }
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

            <div>
                <BrowserRouter>
                    <main className="relative min-h-screen bg-gradient-to-r from-green-600 via-green-400 to-green-500">
                        <AppRouter/>
                        <Toaster/>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
);

export default App;
