"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const login = () => {

    const router = useRouter();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { setCurrentUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (!res.ok) {
                const errorData = await res.json(); 
                throw new Error(errorData.message || "Login failed");
            }

            const data = await res.json();
            setCurrentUser(data.admin); 

            router.push("/dashboard");

        } catch (error) {
            console.log("error during login ", error)
        }

    }

    return (
        <div className='flex items-center justify-center h-screen mx-5 md:mx-0 '>
            <div className="shadow-lg rounded-md p-14 w-96">
                <h1 className='text-xl text-black text-center font-bold'>Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col my-3 gap-3">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="block p-3 border w-full rounded-md border-gray-300 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder='Email' />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="block p-3 border w-full rounded-md border-gray-300 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder='Password' />
                    <button className="inline-block rounded border border-gray-400 bg-gray-400 px-10 py-2 my-2 text-base font-medium text-white hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-400">Login</button>
                </form>
                <Link href="/signup" className="my-2 text-gray-500">
                    Don't have an account? <span className="text-black font-semibold">Signup</span>
                </Link>
            </div>
        </div>
    )
}

export default login