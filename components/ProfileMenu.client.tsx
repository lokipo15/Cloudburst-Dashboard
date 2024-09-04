"use client";

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogOut, User} from "lucide-react";
import Link from "next/link";
import DefaultUserAvatar from "@/components/DefaultUserAvatar";

type profileMenuProps = {
    firstName: string;
    lastName: string;
    signout: () => Promise<void>;
    signoutEverywhere: () => Promise<void>;
}

export default function ProfileMenu({ firstName, lastName, signout, signoutEverywhere }: profileMenuProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <DefaultUserAvatar {...{firstName, lastName, imageWidth: 40, imageHeight: 40} }/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50x">
                <DropdownMenuLabel>{`Witaj, ${firstName}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={"/profile"} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4"/>
                        <span>Moje konto</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signout()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Wyloguj się</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signoutEverywhere()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    <span>Wyloguj się wszędzie</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}