import Image from "next/image";
import ProfileMenu from "@/components/ProfileMenu.client";
import signOut from "@/actions/signout";
import signoutEverywhere from "@/actions/signoutEverywhere";

type navbarProps = {
    firstName: string;
    lastName: string;
}

export default async function Navbar(props: navbarProps) {

    return (
        <nav
            className="flex justify-between items-center h-16 text-neutral-200 fixed left-0 top-2 w-full shadow-sm font-mono px-8"
            role="navigation">
            <Image src={"/logo.svg"} alt={"Logo"} width={300} height={0} style={{height: "auto"}}/>

            <ProfileMenu {...props} signout={signOut} signoutEverywhere={signoutEverywhere}/>
        </nav>
    );
}