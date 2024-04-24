import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import { getUser } from "../actions/get-user.server";
import { MainNav } from "../components/dashboard/main-nav";
import { Search } from "../components/dashboard/search";
import UserNav from "../components/dashboard/user-nav";
import { ModeToggle } from "../components/mode-toggle";

async function getUserData() {
  const accessToken = cookies().get("access-token")?.value;
  const data = await getUser(accessToken);
  return data;
}

export default async function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-6">
          <LogoNav />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav user={user} />
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}

function LogoNav() {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar>
        <AvatarImage asChild src="/avatars/logo.png">
          <Image
            src={"/avatars/logo.png"}
            alt="Avatar"
            fill
            className="w-8 h-8"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </AvatarImage>
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </Button>
  );
}
