import { User } from "@repo/types/src/user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import TodayPageView from "../../components/dashboard/overview/today-page-view";
import TodayVisitors from "../../components/dashboard/overview/today-users";
import TotalMembers from "../../components/dashboard/overview/total-members";

async function getData(): Promise<User[] | undefined> {
  "use server";
  try {
    const res = await fetch(`${process.env.SERVER_IP}/user/allUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export default async function UserManagementPage() {
  const balance = 3189601;
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card id="visitor">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  오늘 방문자 수
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TodayVisitors />
              </CardContent>
            </Card>
            <Card id="page-view">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  오늘 페이지 뷰
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TodayPageView />
              </CardContent>
            </Card>
            <Card id="account-balance">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">계좌 잔액</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balance.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card id="members">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">부원 수</CardTitle>
              </CardHeader>
              <CardContent>
                <TotalMembers />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>학과 분포</CardTitle>
              </CardHeader>
              <CardContent className="pl-6">
                <div className="relative">
                  <div className="absolute w-auto h-auto left-[5px] top-[5px]">
                    <ul className="text-left flex flex-col gap-2">
                      <li className="flex flex-row gap-[10px] items-center">
                        <Skeleton className="w-[14px] h-[14px] mr-1 bg-[#BCBCBD]" />
                        <Skeleton className="w-20 h-5 mr-1 bg-[#BCBCBD]" />
                      </li>
                      <li className="flex flex-row gap-[10px] items-center">
                        <Skeleton className="w-[14px] h-[14px] mr-1 bg-[#BCBCBD]" />
                        <Skeleton className="w-20 h-5 mr-1 bg-[#BCBCBD]" />
                      </li>
                    </ul>
                  </div>
                  <div className="pl-6 w-full h-full flex items-center justify-center">
                    <Skeleton className="w-[320px] h-[320px] rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
