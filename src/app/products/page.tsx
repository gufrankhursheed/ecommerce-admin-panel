"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

interface Product {
    _id: string;
    title: string;
    category: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch("/api/products")
                const data: Product[] = await res.json()
                setProducts(data)
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
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Products</h1>
                        <p className="mt-1.5 text-md text-gray-500">
                            Lets create a new Product
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={"/products/create"} className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring"
                        >
                            <span className="text-sm font-medium"> Create Products </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </Link>
                    </div>
                </div>
            </div>
        </header>


        <hr className="h-px border-0 bg-gray-300" />

        <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
            {products.length === 0 ? (
                <p className="text-xl font-medium text-gray-900">No products found</p>
            ) : (

                <div className="">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Stock</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                            </tr>
                        </thead>
                        {products.map((product, index) => (
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100" key={product._id}>
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-900">{index + 1}</th>
                                    <td className="px-6 py-4">{product.title}</td>
                                    <td className="px-6 py-4 truncate max-w-sm">{product.description}</td>
                                    <td className="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                                        <Link href={`/products/delete/${product._id}`} className="text-red-700">Delete</Link>
                                        <Link href={`/products/edit/${product._id}`} className="text-primary-700">Edit</Link>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>

            )}
        </div>

    </>
}