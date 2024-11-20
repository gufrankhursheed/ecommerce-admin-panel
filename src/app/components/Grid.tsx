export default function Grid() {
    return <>
        <div className="p-10 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="h-32 rounded-lg bg-gray-200 flex flex-col items-center justify-center">
                <h1 className="text-2xl my-1">Profit</h1>
                <p className="text-2xl font-bold flex items-center gap-3 ">
                    RS 10000
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>

                </p>
            </div>
            <div className="h-32 rounded-lg bg-gray-200 flex flex-col items-center justify-center">
                <h1 className="text-2xl my-1">Products</h1>
                <p className="text-2xl font-bold flex items-center gap-3 ">
                    Total Products: 15
                </p>
            </div>
            <div className="h-32 rounded-lg bg-gray-200 flex flex-col items-center justify-center">
                <h1 className="text-2xl my-1">Category</h1>
                <p className="text-2xl font-bold flex items-center gap-3 ">
                    Total Categories: 7
                </p>
            </div>
        </div>
    </>
}