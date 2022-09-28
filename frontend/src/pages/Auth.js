import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import {POS_ROUTE} from "../utils/consts";
import {login, check} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import toast from 'react-hot-toast';
import {fetchOneCart} from "../http/cartAPI";

const Auth = observer(() => {

    const {user} = useContext(Context)

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandle = async () => {

        try {
            await login(email, password)
            check().then(async checkData => {
                user.setId(checkData.id)
                user.setEmail(checkData.email)
                user.setName(checkData.name)
                user.setIsAuth(true)
                user.setGuest('false')
                localStorage.setItem('guest', 'false')
                checkData.role === "ADMIN" ? user.setAdmin(true) : user.setAdmin(false)
                await fetchOneCart(user.id).then(data => user.setCartId(data.id))
                history.push(POS_ROUTE)
            })
        } catch (e) {
            toast.error(e.response.data.message,
                {
                    position: 'bottom-right',
                    duration: 2000,
                }
            )
        }
    }

    return (
        <div className="bg-gradient-to-r from-green-500 to-green-700">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3"
                     style={{backgroundImage: 'url(https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)'}}>
                    <div className="flex items-center h-full px-20 bg-green-700 bg-opacity-50">
                        <div>
                            <h2 className="text-4xl font-bold text-green-100">SmartPOS</h2>
                            <h2 className="text-md text-green-50">Beta (v1.1)</h2>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-center text-green-100">SmartPOS</h2>

                            <p className="mt-3 text-green-50">Sign in to access the sales system</p>
                        </div>

                        <div className="mt-8">
                            <form onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm text-green-50">Email
                                        Address</label>
                                    <input type="email" name="email" id="email" placeholder="user@mail.com"
                                           value={email} onChange={e => setEmail(e.target.value)}
                                           className="block w-full px-4 py-2 mt-2 text-green-700 placeholder-green-400 bg-white border border-green-200 rounded-md placeholder-green-600 bg-green-900 text-green-300 border-green-700 focus:border-green-400 dark focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password"
                                               className="text-sm text-green-50">Password</label>
                                    </div>

                                    <input type="password" name="password" id="password" placeholder="Your Password"
                                           value={password} onChange={e => setPassword(e.target.value)}
                                           className="block w-full px-4 py-2 mt-2 text-green-700 placeholder-green-400 bg-white border border-green-200 rounded-md placeholder-green-600 bg-green-900 text-green-300 border-green-700 focus:border-green-400 dark focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>

                                <div className="mt-6">
                                    <button onClick={loginHandle}
                                            type={"submit"}
                                            className="w-full px-4 py-2 tracking-wide text-green-50 transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;