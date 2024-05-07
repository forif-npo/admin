import { User } from "@repo/types/src/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import RecentMails from "../../components/dashboard/mail/recent-mails";
import TotalMembers from "../../components/dashboard/overview/total-members";
import { DepartDistributionChart } from "../../components/manage-user/charts/depart-distribution-chart";
import EditorWrapper from "../../components/manage-user/user-editor/wrapper";

async function getAllUsers(): Promise<User[] | undefined> {
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
  const users = await getAllUsers();
  const balance = 3189601;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="user-editor">Editor</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card id="visitor">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">부원 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <div className="text-2xl font-bold">200</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card id="page-view">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  홈페이지 회원 수(DB)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <div className="text-2xl font-bold">{users?.length}</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
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
                <DepartDistributionChart users={users} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 col-span-4">
              <CardHeader>
                <CardTitle>최근 메일</CardTitle>
                <CardDescription>최근 5개의 메일을 보여줍니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentMails />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="user-editor" className="space-y-4">
          <EditorWrapper data={users} />
        </TabsContent>
      </Tabs>
    </>
  );
}
