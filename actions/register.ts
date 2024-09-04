import {z} from "zod";
import {hash} from "@node-rs/argon2";
import {generateIdFromEntropySize} from "lucia";
import {lucia} from "@/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {prisma} from "@/database";

const registerSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export default async function register(_:any, formData: FormData) {
    "use server";

    const objectData = Object.fromEntries(formData.entries());
    const parseResult = registerSchema.safeParse(objectData);

    if (!parseResult.success) {
        console.log({
            error: parseResult.error.message,
        });
        return {
            error: parseResult.error.message,
        };
    }

    const { firstName, lastName, email, password } = parseResult.data;

    // hash the password
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    // check if user already exists
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (user) {
        return {
            error: "User already exists",
        };
    }

    // generate user id
    const userId = generateIdFromEntropySize(10);

    // create user
    await prisma.user.create({
        data: {
            id: userId,
            firstName,
            lastName,
            email,
            password_hash: passwordHash,
        }
    });

    //create session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    // append session cookie to response
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // redirect to dashboard
    return redirect("/");
}