import Image from "next/image";
import {ComponentPropsWithoutRef, forwardRef} from "react";

interface DefaultUserAvatarProps extends ComponentPropsWithoutRef<"img"> {
    firstName: string;
    lastName: string;
    imageWidth: number;
    imageHeight: number;
}

const DefaultUserAvatar = forwardRef<HTMLImageElement, DefaultUserAvatarProps>(function DefaultUserAvatar({
                                                                                                              firstName,
                                                                                                              lastName,
                                                                                                              imageWidth,
                                                                                                              imageHeight,
                                                                                                              ...props
                                                                                                          }: DefaultUserAvatarProps, ref) {
    return (
        <Image {...props} ref={ref}
               src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`}
               alt={"Avatar"} width={imageWidth} height={imageHeight} className="rounded-full"/>
    );
});

export default DefaultUserAvatar;