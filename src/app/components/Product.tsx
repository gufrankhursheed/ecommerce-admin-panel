"use client";

import connect from "@/connection/mongoDB";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import toast from "react-hot-toast";

interface ProductProps {
    productInfo?: {
        _id?: string;
        title: string;
        category: string;
        description: string;
        price: number;
        images: { id: string; src: string }[];
    };
}

export default function Product({ productInfo }: ProductProps) {
    const [title, setTitle] = useState(productInfo?.title || '');
    const [category, setCategory] = useState(productInfo?.category || '');
    const [description, setDescription] = useState(productInfo?.description || '');
    const [price, setPrice] = useState<number | null>(productInfo?.price || null);
    const [images, setImages] = useState<{ id: string; src: string }[]>(productInfo?.images || []);
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState(null)
    const router = useRouter();

    useEffect(() => {
        if (productInfo) {
            setTitle(productInfo.title);
            setCategory(productInfo.category);
            setDescription(productInfo.description);
            setPrice(productInfo.price);
            setImages(productInfo.images || []);
        }
    }, [productInfo]);

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value ? parseFloat(value) : null;
        setPrice(numericValue);
    }

    async function uploadImages(e: any) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            setUploadError(null)

            const uploadImagesQueue: Promise<void>[] = [];

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                uploadImagesQueue.push(
                    fetch('/api/upload', {
                        method: 'POST',
                        body: data,
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error('Upload failed');
                            }
                            return res.json();
                        })
                        .then((data) => {

                            const newImages = data.links.map((link: string) => ({
                                id: Math.random().toString(36).slice(2, 11), 
                                src: link,
                            }));

                            setImages((oldImages) => [...oldImages, ...newImages]);
                        })
                        .catch((error) => {
                            console.error("Upload failed", error);
                        })
                );
            }

            await Promise.all(uploadImagesQueue);
            setIsUploading(false);
        } else {
            console.error("No files selected or an error occurred");
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const method = productInfo ? "PUT" : "POST";
            const endpoint = productInfo ? `/api/products/${productInfo._id}` : "/api/products";
            
            const numericPrice = price !== null ? price : 0; 

            const formattedImages = images.map((image) => ({
                id: image.id,
                src: image.src,
            }));
    
            const res = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    price: numericPrice,
                    images: formattedImages,
                }),
            });

            if (res.ok) {
                if(productInfo){ 
                    toast.success('Product Updated')
                    router.push('/products');
                } else {
                    toast.success('Product Created')
                    router.push('/');
                }
            } else {
                const errorData = await res.json();
                console.log(errorData);
            }
        } catch (error) {
            console.log("Error during creating/updating product", error);
        }
    };


    const updateImagesOrder = (newOrder: { id: string; src: string }[]) => {
        setImages(newOrder);
    };

    const handleDeleteImage = (index: number) => {
        const updateImages = [...images]
        updateImages.splice(index, 1)
        setImages(updateImages);
    }


    return <>
        <form onSubmit={handleSubmit} className="mx-auto max-w-screen-md ">
            <div className="md:mx-auto max-w-xl my-2 mb-1 mx-2">
                <div>
                    <label htmlFor="example1" className="mb-1 block text-xl font-medium text-gray-700">Title</label>
                    <input type="text" id="example1" className="block w-full rounded-md border border-gray-300 outline-none p-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Product Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
            </div>
            <div className="md:mx-auto max-w-xl my-2 mb-1 mx-2">
                <div>
                    <label htmlFor="example1" className="mb-1 block text-xl font-medium text-gray-700">Select Category</label>
                    <select id="selectCategory" name="selectCategory" className="block w-full rounded-md border border-gray-300 outline-none p-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option>Select</option>
                        <option>Shoe</option>
                        <option>Phone</option>
                        <option>Earbuds</option>
                        <option>TV</option>
                        <option>Speaker</option>
                        <option>Jacket</option>
                        <option>Shirt</option>
                    </select>
                </div>
            </div>
            <div className="md:mx-auto max-w-xl my-2 mb-1 mx-2">
                <div >
                    <label htmlFor="example1" className="mb-1 block text-xl font-medium text-gray-700">Image</label>
                    <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                        <div className="space-y-1 text-center">
                            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </div>
                            <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
                            <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                        <input id="fileInput" type="file" className="hidden" accept="image/*" multiple onChange={uploadImages} />
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-3 items-center rounded md:mx-auto max-w-xl my-2 mb-1 mx-2">
                {isUploading &&
                    <Spinner />
                }
            </div>
            {!isUploading &&
                <div className="grid grid-cols-2 gap-4 md:mx-auto max-w-xl my-2 mb-1 mx-2">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                            <div key={image.id || index} className="relative group">
                                <img src={image.src} alt="image" className=" h-36 w-full md:h-40 md:w-48 rounded-lg p-1 md:p-2 " />
                                <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                                    <button onClick={() => { handleDeleteImage(index) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            }
            <div className="md:mx-auto max-w-xl my-2 mb-1 mx-2">
                <div>
                    <label htmlFor="example1" className="mb-1 block text-xl font-medium text-gray-700">Description</label>
                    <textarea rows={5} id="description" className="block w-full rounded-md border border-gray-300 outline-none p-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Product Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </div>
            </div>
            <div className="md:mx-auto max-w-xl my-2 mb-1 mx-2">
                <div>
                    <label htmlFor="example1" className="mb-1 block text-xl font-medium text-gray-700">Price</label>
                    <input type="number" id="price" className="block w-full rounded-md border border-gray-300 outline-none p-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Product Price" value={price !== null ? price : ''} onChange={handleChangePrice} />
                </div>
            </div>
            <div className="md:mx-auto max-w-xl my-2 mb-1 mx-2">
                <div>
                    <button className=" w-full text-white text-lg bg-black py-2 px-5 focus:outline-none rounded cursor-pointer shadow-md hover:bg-gray-800 ">Save Product
                    </button>
                </div>
            </div>

        </form>
    </>
}