import { auth } from "@/auth";

export default async function Settings(){
    const session = await auth();
    const user = session?.user;
 
    return user ? (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="sm:flex sm:gap-4">
                                <div className="h-10 w-10">
                                    <img className="h-9 w-9 rounded-full object-cover object-center" src={user?.image ?? ""} alt="" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{user.name}</h1>
                        </div>
                        <p className="mt-1.5 text-md text-gray-500">
                            {user.email}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="inline-flex items-center justify-center gap-1.5 rounded border border-red-200 bg-white px-5 py-3 text-red-900 transition hover:bg-red-200 hover:text-red-700 focus:outline-none focus:ring"
                        >
                            <span className="text-sm font-medium"> Log out </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    ) : (
        <div>no user</div>
    )
}
