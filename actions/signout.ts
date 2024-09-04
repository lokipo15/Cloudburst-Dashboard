import {lucia} from "@/auth";
import {redirect} from "next/navigation";
import {validateRequest} from "@/validateRequest";

export default async function signOut() {
    "use server";

    const {session} = await validateRequest();

    await lucia.invalidateSession(session?.id || "");

    redirect("/login");
}