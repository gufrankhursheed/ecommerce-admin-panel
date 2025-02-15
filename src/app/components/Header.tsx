"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@auth/core/types";
import { useAuth } from "../context/AuthContext";

export default function Header({ user }: { user?: User }) {
    const { currentUser } = useAuth();

    if (user || currentUser) {
        return (
            <header className="bg-white border-b sticky z-50 top-0">
                <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center flex-1 md:flex md:items-center md:gap-1">
                            <Link className="block text-teal-600" href="/">
                                <span className="sr-only">Home</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                </svg>

                            </Link>
                            <h1 className="text-2xl md:text-xl text-teal-600 hover:cursor-pointer">Admin</h1>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-lg">
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/dashboard">Dashboard</Link>
                                    </li>

                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/orders">Orders</Link>
                                    </li>

                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/settings">Settings</Link>
                                    </li>
                                </ul>
                            </nav>

                            <div className="flex items-center gap-4">
                                <div className="sm:flex sm:gap-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="2em"
                                        height="2em"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M6.196 17.485q1.275-.918 2.706-1.451Q10.332 15.5 12 15.5t3.098.534t2.706 1.45q.99-1.025 1.593-2.42Q20 13.667 20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.667.603 3.064q.603 1.396 1.593 2.42M12 12.5q-1.263 0-2.132-.868T9 9.5t.868-2.132T12 6.5t2.132.868T15 9.5t-.868 2.132T12 12.5m0 8.5q-1.883 0-3.525-.701t-2.858-1.916t-1.916-2.858T3 12t.701-3.525t1.916-2.858q1.216-1.215 2.858-1.916T12 3t3.525.701t2.858 1.916t1.916 2.858T21 12t-.701 3.525t-1.916 2.858q-1.216 1.215-2.858 1.916T12 21"
                                        ></path>
                                    </svg>
                                </div>

                                <div className="block md:hidden">
                                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}