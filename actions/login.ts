import {z} from "zod";
import {verify} from "@node-rs/argon2";
import {lucia} from "@/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {prisma} from "@/database";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


export default async function login(_: any, formData: FormData) {
    "use server";


    const objectData = Object.fromEntries(formData.entries());
    const parseResult = loginSchema.safeParse(objectData);

    if (!parseResult.success) {

        return {
            error: parseResult.error.errors[0].message,
        };
    }

    const {email, password} = parseResult.data;

    // check if user exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (!existingUser) {
        return {
            error: "Invalid username or password."
        }
    }

    // Check if password is valid
    const validPassword = await verify(existingUser.password_hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    if (!validPassword) {
        return {
            error: "Invalid username or password."
        }
    }

    // create session
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    // append session cookie to response
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // redirect to dashboard
    return redirect("/")

}

