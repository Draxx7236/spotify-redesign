import type { NextPage } from 'next'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  // Loading animation...
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="">
      <Head>
        <title>Wave</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  )
}

export default Home
