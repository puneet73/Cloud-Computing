import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDistanceToNow, formatRelative } from 'date-fns';

import {
    Collapse,
    initTE,
} from "tw-elements";

import axios from 'axios';
import DummyHeader from './DummyHeader';

function Orderhistory() {
    initTE({ Collapse });

    const [orders, setOrders] = useState([]);
    const [user, setLoginUser] = useState({});

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem("MyUser")));
    }, []);

    const getOrders = async () => {
        try {
            const { data } = await axios.post("http://localhost:3004/orderhistory", { user });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (user !== null) {
                setOrders([]);
                const result = await getOrders();
                setOrders(result);
            }
        }
        fetchData();
    }, [user]);

    return (
        <div className="bg-gray-900 min-h-screen">
            <DummyHeader></DummyHeader>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-extrabold text-white">Order History</h1>
                <div className="mt-6">
                    {orders.length === 0 ? (
                        <p>Loading orders...</p>
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-gray-800 rounded-lg shadow-md mt-6"
                            >
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div className="text-lg font-bold text-yellow-200">
                                            Order # : {order._id}
                                        </div>
                                        <div className="text-base font-medium text-lime-300	">
                                            {formatRelative(new Date(order.createdAt), new Date())}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="mb-0" id="headingOne">
                                            <button
                                                className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-lime-300 dark:text-black text-bold [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-rose-400 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                                type="button"
                                                data-te-collapse-init
                                                data-te-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne">
                                                View Items
                                                <span
                                                    className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </h2>
                                        {order.items.map((product) => (
                                            <div key={product.title} id="collapseOne"
                                                className="!visible flex items-center py-2"
                                                data-te-collapse-item
                                                data-te-collapse-show
                                                aria-labelledby="headingOne"
                                                data-te-parent="#accordionExample">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    className="h-20 w-20 rounded object-cover mb-4" />

                                                <div className="text-base font-medium text-cyan-400">
                                                    &nbsp;&nbsp;{product.title}&nbsp;
                                                </div>
                                                <div className="text-base font-medium text-emerald-200">
                                                    X {product.qty}
                                                </div>
                                                <div className="ml-auto text-base font-medium text-pink-500	">
                                                    {product.price}
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="text-base font-medium text-white">
                                            Total Price: {order.price}
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="flex justify-between items-center">
                                        <div className="text-base font-bold text-fuchsia-200	">
                                            Delivering at : {order.address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))
                    }

                </div>

            </div>
        </div>
    );
}

export default Orderhistory;