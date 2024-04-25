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
import { NewUserChannelChart } from "../../components/dashboard/charts/new-user-channel-chart";
import RecentMails from "../../components/dashboard/mail/recent-mails";
export default function StudyManagementPage() {
  const totalStudies = 10;
  const totalApplies = 10;
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Study Management</h2>
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
                  Total Studies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalStudies.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card id="page-view">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalApplies.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <NewUserChannelChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 col-span-4">
              <CardHeader>
                <CardTitle>최근 신청서</CardTitle>
                <CardDescription>
                  최근 5개의 신청서를 보여줍니다.
                </CardDescription>
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
