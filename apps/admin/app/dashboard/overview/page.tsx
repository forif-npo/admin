import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import RecentMails from "../../components/dashboard/mail/recent-mails";
import OverviewChartCard from "../../components/dashboard/overview/chart-card";
import TodayPageView from "../../components/dashboard/overview/today-page-view";
import TodayVisitors from "../../components/dashboard/overview/today-users";
import TotalMembers from "../../components/dashboard/overview/total-members";

export default function DashboardOverViewPage() {
  const balance = 3189601;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
            <OverviewChartCard />
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
      </Tabs>
    </>
  );
}
