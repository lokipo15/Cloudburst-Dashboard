"use client";

import Link from "next/link";
import {formProps} from "@/components/LoginForm";
import {useFormState, useFormStatus} from "react-dom";

export default function RegisterForm({formAction}: formProps) {
    const [error, stateAction] = useFormState(formAction, null);

    return (
        <>
            <form className="flex flex-col items-center" action={stateAction}>
                <div className="flex flex-row justify-between gap-4">
                    <input type="text" placeholder="Imię" name="firstName"
                           className="p-2 my-2 w-80 bg-neutral-400 placeholder:text-neutral-100 rounded-lg"/>
                    <input type="text" placeholder="Nazwisko" name="lastName"
                           className="p-2 my-2 w-80 bg-neutral-400 placeholder:text-neutral-100 rounded-lg"/>
                </div>

                <input type="email" placeholder="Email" name="email"
                       className="p-2 my-2 w-full bg-neutral-400 placeholder:text-neutral-100 rounded-lg"/>
                <input type="password" placeholder="Hasło" name="password"
                       className="p-2 my-2 w-full bg-neutral-400 placeholder:text-neutral-100 rounded-lg"/>
                <Submit/>
                {error && <p className="text-red-500 text-sm">{error.error}</p>}
            </form>
            <div className="flex flex-row justify-between items-center">
                <p className="text-base text-neutral-400 font-light pr-2">Masz już konto?</p>
                <Link href={"/login"}>
                    <p className="text-blue-500 transition-all duration-300 ease-in-out hover:text-blue-600">Zaloguj się</p>
                </Link>
            </div>
        </>
)
}

function Submit() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}
                className="p-2 my-2 w-full bg-blue-500 text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-700">{pending ? "Rejestruję..." : "Zarejestruj"}
        </button>
    )
}