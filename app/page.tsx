import {validateRequest} from "@/validateRequest";
import {redirect} from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function Home() {
    const {user} = await validateRequest();
    if (!user) redirect("/login");

    return (
        <>
            <Navbar firstName={user.firstName} lastName={user.lastName}/>
            <main className="flex min-h-screen max-w-[1140px] mx-auto flex-col items-center justify-center p-24">
                <article
                    className="flex flex-col justify-center items-center min-h-[300px] bg-gradient-to-b from-0% from-gray-500/10 to-gray-400/20 rounded-2xl border-[1px] border-neutral-500 shadow-lg shadow-gray-700 drop-shadow-lg">
                    <h1 className="text-5xl text-center font-light text-blue-500 pb-4">Witaj w systemie zarządzania
                        firmą {"<"}cloudburst {"/>"} </h1>
                    <p className="text-xl text-center text-neutral-400 font-light">Ta ścieżka jest chroniona.</p>
                </article>
            </main>
        </>
    );
}
