"use client";
import { User } from "@repo/types/src/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserNav({ user }: { user: User | null }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage asChild src="/avatars/02.png">
              <Image
                src={"/avatars/02.png"}
                alt="Avatar"
                fill
                className="w-8 h-8"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AvatarImage>
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 mt-3">
        <DropdownMenuLabel>
          {user ? user.userName : "Anonymous"}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-medium">부회장</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive font-bold"
            onClick={() => router.push("/signout")}
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
