"use client";

import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

interface Order {
    _id: string;
    line_items: [];
    name: string;
    email: string;
    city: string;
    state:string;
    zip: string;
    address: string;
    paid: string;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch("/api/orders")
                const data: Order[] = await res.json()
                setOrders(data)
            } catch (error) {
                console.log("find all products error", error)
            }  finally {
                setLoading(false);
            }
        }
        getProducts()
    }, [])    

    if (loading) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Spinner />
            </div>
        ); 
    }
    return <>
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Orders</h1>
                    </div>
                </div>
            </div>
        </header>


        <hr className="h-px border-0 bg-gray-300" />


        <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
            {orders.length === 0 ? (
                <p className="text-xl font-medium text-gray-900">No products found</p>
            ) : (

                <div className="">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Customer Name</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Customer Email</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Total Products</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">City</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Zip</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                            </tr>
                        </thead>
                        {orders.map((order, index) => (
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100" key={order._id}>
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-900">{index + 1}</th>
                                    <td className="px-6 py-4">{order.name}</td>
                                    <td className="px-6 py-4">{order.email}</td>
                                    <td className="px-6 py-4 truncate max-w-sm">{order.line_items.length}</td>
                                    <td className="px-6 py-4">{order.city}</td>
                                    <td className="px-6 py-4">{order.zip}</td>
                                    
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>

            )}
        </div>
    </>
}