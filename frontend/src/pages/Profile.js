import React, {useContext, useState}  from 'react';
import NavBar from "../components/NavBar";
import {ScaleLoader} from "react-spinners";
import {Context} from "../index";

const Profile = () => {

    const {user} = useContext(Context)

    return (
        <div>
            <NavBar/>
            <div className="max-w-7xl py-6 mx-auto sm:px-6 lg:px-3">
                    <div className="border border-green-300 bg-green-50 rounded-xl p-4 text-xs mt-6">
                        <div className="flex justify-between items-center">
                                        <span className="text-green-900 text-sm font-medium">
                                          About user
                                        </span>
                        </div>
                        <div className="mt-4">
                            <div className="mb-2 flex justify-between items-center text-green-800">
                                <span>Name</span>
                                <span
                                    className="text-sm font-normal">{user.name}</span>
                            </div>
                            <div className="mb-2 flex justify-between items-center text-green-800">
                                <span>Email</span>
                                <span
                                    className="text-sm font-normal">{user.userEmail}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Profile;