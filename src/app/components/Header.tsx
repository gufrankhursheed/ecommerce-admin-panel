import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
    const session = await auth()
    const user = session?.user

    if(session){
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
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/">Dashboard</Link>
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
                                    <div className="h-10 w-10">
                                        <Image width={1000} height={1000} className="h-9 w-9 rounded-full object-cover object-center" src={user?.image ?? ""} alt="" />
                                    </div>
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