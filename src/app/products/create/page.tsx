import Products from "../../components/Product";

export default function CreateProduct() {
    return <>
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 sm:py-8 lg:px-8">
            <div className="flex items-center justify-center gap-4 md:flex md:items-center md:justify-center">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Create a new Product</h1>
            </div>
        </div>
        <Products />
    </>
}