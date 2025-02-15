import { auth } from "@/auth";
import Grid from "../components/Grid";
import Head from "../components/Head";

export default async function Dashboard() {
    const session = await auth();
    const user = session?.user

    return <>
        <Head user={user}/>
        <Grid />
    </>
}