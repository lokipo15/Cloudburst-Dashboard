import {validateRequest} from "@/validateRequest";
import {redirect} from "next/navigation";
import Navbar from "@/components/Navbar";
import DefaultUserAvatar from "@/components/DefaultUserAvatar";

export default async function Page() {
    const {user} = await validateRequest();
    if (!user) redirect("/login");


    return (
        <>
            <Navbar firstName={user.firstName} lastName={user.lastName}/>
            <main className="flex min-h-screen max-w-[1140px] mx-auto items-center justify-center p-24">
                <article
                    className="flex p-[1.5rem] flex-col items-center justify-between min-w-[45rem] min-h-[30rem] bg-gradient-to-b from-0% from-gray-500/10 to-gray-400/20 rounded-2xl border-[1px] border-neutral-500 shadow-lg shadow-gray-700 drop-shadow-lg">
                    <div className="flex flex-col items-center">
                        <DefaultUserAvatar firstName={user.firstName} lastName={user.lastName} imageWidth={64}
                                           imageHeight={64}/>
                        <h1 className="text-2xl font-semibold text-neutral-200 pt-2">Witaj, {user.firstName}</h1>
                    </div>

                </article>
            </main>
        </>
    );
}