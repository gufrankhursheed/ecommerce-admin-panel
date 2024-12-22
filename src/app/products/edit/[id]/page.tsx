"use client";

import { useParams } from 'next/navigation';
import Products from "../../../components/Product";
import { useEffect, useState } from 'react';
import Spinner from '@/app/components/Spinner';

interface Product {
    _id: string;
    title: string;
    category: string;
    description: string;
    price: number;
    images: { id: string; src: string }[]; 
    stock: number
}

export default function Edit() {
    const { id } = useParams();

    const [productInfo, setProductInfo] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) {
            setLoading(false)
            return;
        } else {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${id}`);
                    if (!response.ok) {
                        throw new Error("Product not found");
                    }
                    const data = await response.json();

                    setProductInfo(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }

    }, [id]);

    if (loading) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Spinner />
            </div>
        ); 
    }

    if (!productInfo) {
        return <div>No product information available.</div>;
    }

    return <>
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 sm:py-8 lg:px-8">
            <div className="flex items-center justify-center gap-4 md:flex md:items-center md:justify-center">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Editing {productInfo.title}</h1>
            </div>
        </div>
        {productInfo && 
        <Products productInfo={productInfo}/>
        }
    </>
}