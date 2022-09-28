import React, {useContext, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon, LogoutIcon} from '@heroicons/react/solid'
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import {Context} from "../index";
import {LOGIN_ROUTE, POS_ROUTE, PROFILE_ROUTE, PROFILE_SETTINGS_ROUTE} from "../utils/consts";

const NavBar = observer(() => {

    const history = useHistory()

    const {user} = useContext(Context)

    const logOut = () => {
        user.setIsAuth(false)
        user.setEmail(null)
        user.setId(null)
        user.setAdmin(false)
        user.setName(null)
        user.setGuest(true)
        user.setCartId(null)
        localStorage.clear();
        history.push(LOGIN_ROUTE)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <nav className="bg-green-800 backdrop-filter backdrop-blur-lg bg-opacity-70">
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <NavLink className="text-xl text-green-100 font-bold"
                                             to={POS_ROUTE}>SmartPOS</NavLink>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => logOut()}
                                        type="button"
                                        className="inline-flex items-center px-1.5 py-1.5 border border-red-600 shadow-sm text-sm rounded-md text-red-200 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-red-800"
                                    >
                                        <LogoutIcon className="-ml-1 mr-2 h-5 w-5 text-red-200" aria-hidden="true"/>
                                        <span>Logout</span>
                                    </button>
                                </div>
                                <Menu as="div" className="relative inline-block text-left px-3">
                                    <div>
                                        <Menu.Button
                                            className="inline-flex justify-center w-full rounded-md border border-green-400 shadow-sm px-1.5 py-1.5 bg-green-200 text-sm font-medium text-green-800 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-400 focus:ring-green-500">
                                            {user.name}
                                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="origin-top-right cursor-pointer absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-green-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            onClick={() => history.push(PROFILE_ROUTE)}
                                                            className={classNames(
                                                                active ? 'bg-green-300 text-green-900' : 'text-green-800',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            onClick={() => history.push(PROFILE_SETTINGS_ROUTE)}
                                                            className={classNames(
                                                                active ? 'bg-green-300 text-green-900' : 'text-green-800',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Profile settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            </nav>
        </div>
    );
});

export default NavBar;