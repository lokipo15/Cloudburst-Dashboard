import {lucia} from "@/auth";
import {redirect} from "next/navigation";
import {validateRequest} from "@/validateRequest";

export default async function signoutEverywhere() {
    "use server";

    const {user} = await validateRequest();

    await lucia.invalidateUserSessions(user?.id || "");

    redirect("/login");
}