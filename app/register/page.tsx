import RegisterForm from "@/components/RegisterForm";
import {validateRequest} from "@/validateRequest";
import {redirect} from "next/navigation";
import register from "@/actions/register";

export default async function Page() {
    const { user } = await validateRequest();
    if (user) redirect("/");

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <article className="flex flex-col justify-between py-4 px-6 items-center min-h-[300px] min-w-[500px] mx-auto bg-gradient-to-b from-0% from-gray-500/10 to-gray-400/20 rounded-2xl border-[1px] border-neutral-500 shadow-lg shadow-gray-700 drop-shadow-lg">
                <h1 className="text-5xl text-center font-light text-blue-500 pb-4">Zarejestruj się</h1>
                <RegisterForm formAction={register}/>
            </article>
        </main>
    );
}