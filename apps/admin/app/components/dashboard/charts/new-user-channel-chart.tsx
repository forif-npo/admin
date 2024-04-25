"use client";

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

import { protos } from "@google-analytics/data";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import useSWR from "swr";
import fetcher from "../../../actions/fetcher";
import PieChartSkeleton from "../../skeleton/pie-chart-skeleton";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface UserChartData {
  name: string;
  value: number;
}

const translations: { [key: string]: string } = {
  Direct: "URL",
  "Organic Search": "검색 엔진",
  "Organic Social": "소셜 네트워크",
  Referral: "블로그, 뉴스",
};

export function NewUserChannelChart() {
  const { data, error } = useSWR<
    protos.google.analytics.data.v1beta.IRunReportResponse[]
  >(
    "/api/analytics?startDate=2024-03-01&endDate=today&dimensions=firstUserDefaultChannelGroup&metrics=newUsers",
    fetcher,
  );

  if (error) return <div>ERROR OCCURED..</div>;
  if (!data) return <PieChartSkeleton />;

  const userChartData: UserChartData[] | undefined =
    data[0]?.rows?.map((row) => {
      // 먼저 value 값을 안전하게 추출합니다.
      const key = row.dimensionValues?.[0]?.value;
      const name = key ? translations[key] ?? "미정의" : "미정의"; // key가 존재하면 사전에서 찾고, 없으면 "미정의"
      const value = parseInt(row.metricValues?.[0]?.value ?? "0");
      return { name, value };
    }) ?? undefined;

  return (
    <ResponsiveContainer width="100%" height={350} className={"pl-4"}>
      <PieChart>
        <Legend layout="vertical" verticalAlign="top" align="left" />
        <Pie
          data={userChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabels}
          outerRadius={160}
          fill="#8884d8"
          dataKey="value"
        >
          {userChartData!.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

const renderLabels = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
