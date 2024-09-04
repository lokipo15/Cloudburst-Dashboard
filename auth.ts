import {Lucia} from "lucia";
import {adapter} from "./database";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to true when using https
            secure: process.env.NODE_ENV === "production",
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
        }
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    firstName: string;
    lastName: string;
}