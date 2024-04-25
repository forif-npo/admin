import Footer from "@repo/ui/components/ui/footer";
import { cookies } from "next/headers";
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
          <MainNav className="mx-2" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav user={user} />
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      <Footer />
    </div>
  );
}
