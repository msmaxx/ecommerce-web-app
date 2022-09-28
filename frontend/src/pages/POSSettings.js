import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {fetchAllUsers} from "../http/userAPI";
import {ScaleLoader} from "react-spinners";
import moment from "moment";

const PosSettings = () => {

    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetchAllUsers().then(data => setUserData(data))
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center my-20">
                <ScaleLoader size={45} color='#673077'/>
            </div>
        )
    }

    const getRole = (role) => {
        if (role === 'ADMIN') {
            return (
                <p>Administrator</p>
            )
        }
        if (role === 'USER') {
            return (
                <p>Client</p>
            )
        }
    }

    return (
        <div>
            <NavBar/>
            <div className="max-w-7xl py-6 mx-auto sm:px-6 lg:px-3">

                <div className="flex flex-col">
                    <div className="-my-2 px-4 overflow-x-auto rounded-lg sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-green-400">
                                    <thead className="bg-green-600">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase tracking-wider">
                                            Date of registration
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="bg-green-200 divide-y divide-green-400">
                                    {userData.map(user =>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {getRole(user.role)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-900">
                                                {moment(user.createdAt).format('DD/MM/YY HH:mm')}
                                            </td>
                                        </tr>
                                    )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PosSettings;