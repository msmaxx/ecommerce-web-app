import React from 'react';
import NavBar from "../components/NavBar";
import {PRODUCTS_ROUTE, REPORTS_ROUTE, SALE_ROUTE, SETTINGS_ROUTE} from "../utils/consts";
import {
    DocumentTextIcon,
    CalculatorIcon,
    AdjustmentsIcon,
    ViewListIcon,
} from '@heroicons/react/outline'
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";

const POS = observer(() => {
    const history = useHistory()
    return (
        <div>
            <header className="sticky top-0 z-50"><NavBar/></header>

            <div>
                <div className="max-w-7xl px-4 py-4 mx-auto sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">

                        <a
                            className="animate-shimmer p-8 border border-green-800 cursor-pointer bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-[length:400%_100%] backdrop-blur-lg shadow-xl rounded-xl hover:shadow-green-700/70 hover:border-green-700/50"
                            onClick={() => history.push(SALE_ROUTE)}
                        >
                            <CalculatorIcon className="-ml-1 mr-2 h-16 w-16 text-green-100"/>

                            <h3 className="mt-4 text-3xl font-bold text-green-50">Sale</h3>

                        </a>

                        <a
                            className="animate-shimmer p-8 border border-green-800 cursor-pointer bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-[length:400%_100%] backdrop-blur-lg shadow-xl rounded-xl hover:shadow-green-700/70 hover:border-green-700/50"
                            onClick={() => history.push(PRODUCTS_ROUTE)}
                        >
                            <ViewListIcon className="-ml-1 mr-2 h-16 w-16 text-green-100"/>

                            <h3 className="mt-4 text-3xl font-bold text-green-50 ">Products</h3>

                        </a>

                        <a
                            className="animate-shimmer p-8 border border-green-800 cursor-pointer bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-[length:400%_100%] backdrop-blur-lg shadow-xl rounded-xl hover:shadow-green-700/70 hover:border-green-700/50"
                            onClick={() => history.push(REPORTS_ROUTE)}
                        >
                            <DocumentTextIcon className="-ml-1 mr-2 h-16 w-16 text-green-100"/>

                            <h3 className="mt-4 text-3xl font-bold text-green-50">Reports</h3>

                        </a>

                        <a
                            className="animate-shimmer p-8 border border-green-800 cursor-pointer bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-[length:400%_100%] backdrop-blur-lg shadow-xl rounded-xl hover:shadow-green-700/70 hover:border-green-700/50"
                            onClick={() => history.push(SETTINGS_ROUTE)}
                        >
                            <AdjustmentsIcon className="-ml-1 mr-2 h-16 w-16 text-green-100"/>

                            <h3 className="mt-4 text-3xl font-bold text-green-50">Settings</h3>

                        </a>
                    </div>
                </div>
            </div>

            {/*<div className="max-w-7xl mx-auto w-full flex-grow py-8 px-4 cursor-pointer sm:px-6 lg:px-8 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        className={classNames(
                            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                            'relative group bg-green-50 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500'
                        )}
                    >
                        <div>
            <span
                className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    'rounded-lg inline-flex p-3 ring-4 ring-green-100'
                )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true"/>
            </span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-medium">
                                <a onClick={() => history.push(action.href)} className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true"/>
                                    {action.title}
                                </a>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>*/}
        </div>
    );
});

export default POS;