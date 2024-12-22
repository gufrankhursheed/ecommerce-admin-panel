import { auth, signIn } from "@/auth"
import Link from "next/link"
import Grid from "./components/Grid"

export default async function Home() {
  const session = await auth()
  const user = session?.user

  return user ? (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back, <span className="text-gray-900">{user.name}!</span> </h1>

              <p className="mt-1.5 text-md text-gray-500">
                View the statistics about your business. Also manage and add your products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={"/products"} className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring"
              >
                <span className="text-sm font-medium"> View Products </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>

              <Link
                href={""} className="inline-flex items-center justify-center gap-1.5 rounded border border-orange-200 bg-white px-5 py-3 text-orange-200 transition hover:bg-orange-200 hover:text-orange-400 focus:outline-none focus:ring"
              >
                <span className="text-sm font-medium"> View Shop </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

              </Link>
            </div>
          </div>
        </div>
      </header>

      <Grid />

    </>
  ) : (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Welcome to the admin of the website</h1>
        <p className="text-2xl font-medium my-2 ">An account is needed to view this page</p>
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button
            className="inline-block rounded border border-gray-400 bg-gray-400 px-10 py-2 my-2 text-base font-medium text-white hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-400"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </>
  )
}
