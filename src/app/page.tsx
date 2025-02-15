import Link from "next/link"
import Grid from "./components/Grid"
import Head from "./components/Head"
import { handleSignIn } from "./actions/signInActions"

export default async function Home() {
  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Welcome to the admin of the website</h1>
        <p className="text-2xl font-medium my-2 ">An account is needed to view this page</p>
        <Link href="/login" className="rounded border border-gray-400 bg-gray-400 px-10 py-2 my-2 text-base font-medium text-white hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-400">
          Log in
        </Link>
        <h2 className="text-center my-1">OR</h2>
        <button
        onClick={handleSignIn}
            className="inline-block rounded border border-gray-400 bg-gray-400 px-10 py-2 my-2 text-base font-medium text-white hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-400"
          >
            Sign in with Google
          </button>
      </div>
    </>
  )
}
