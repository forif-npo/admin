import { Study } from "@repo/types/src/study";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import StudyCalendar from "../../components/manage-study/study-calendar";
import EditorWrapper from "../../components/manage-study/study-page-editor/wrapper";
export default async function StudyManagementPage() {
  async function getData() {
    "use server";
    const res = await fetch(
      "http://ec2-43-201-12-224.ap-northeast-2.compute.amazonaws.com:8080/studies/all?year=2024&semester=1",
      {
        next: {
          revalidate: 60,
        },
      },
    );
    const data: Study[] = await res.json();
    return data;
  }
  const data = await getData();
  const money = 5123522;
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">스터디 관리</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="page-editor">Page Editor</TabsTrigger>
          <TabsTrigger value="reports">Mentors</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card id="regular-study">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  정규 스터디
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.length}</div>
                <p className="text-xs text-muted-foreground">
                  +20% from last year
                </p>
              </CardContent>
            </Card>
            <Card id="independent-study">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  자율 스터디
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card id="mentor">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">멘토 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card id="study-money">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  스터디 지원금
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {money.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last year
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>수업 일정을 확인해보세요.</CardTitle>
              </CardHeader>
              <CardContent>
                <StudyCalendar data={data} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="page-editor" className="space-y-4">
          <EditorWrapper data={data} />
        </TabsContent>
      </Tabs>
    </>
  );
}
