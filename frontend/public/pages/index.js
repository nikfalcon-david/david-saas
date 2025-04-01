// pages/index.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/login");
    }, [session, status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
            <p className="text-gray-700">You are logged in.</p>
        </div>
    );
}


