"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { ElementType, useState } from "react";
import { MemberCountChart } from "../charts/member-count-chart";
import { NewUserChannelChart } from "../charts/new-user-channel-chart";

export const overviewMenus = {
  member: "부원 수 추이",
  channel: "웹사이트 진입 경로",
};
type ChartKey = "member" | "channel";
const chartComponents: { [key in ChartKey]: ElementType } = {
  member: MemberCountChart,
  channel: NewUserChannelChart,
};

export default function OverviewChartCard() {
  const [value, setValue] = useState<ChartKey>("member");

  const SelectedChart = chartComponents[value];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          <Select
            value={value}
            onValueChange={setValue as (value: ChartKey) => void}
            defaultValue={value}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue aria-label={value}>
                {overviewMenus[value as keyof typeof overviewMenus]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="member">부원 수 추이</SelectItem>
                <SelectItem value="channel">웹사이트 진입 경로</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <SelectedChart />
      </CardContent>
    </Card>
  );
}
