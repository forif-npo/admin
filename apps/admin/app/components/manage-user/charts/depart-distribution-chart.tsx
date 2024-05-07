"use client";

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

import { User } from "@repo/types/src/user";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import PieChartSkeleton from "../../skeleton/pie-chart-skeleton";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#CA8787",
  "#E1ACAC",
];

interface UserChartData {
  name: string; //department
  value: number; //the number of users which belong to the department
}

export function DepartDistributionChart({
  users,
}: {
  users: User[] | undefined;
}) {
  if (!users) return <PieChartSkeleton />;

  // Collect data for all departments
  const departmentData: { [key: string]: number } = users.reduce(
    (acc: { [key: string]: number }, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    },
    {},
  );

  // Sort departments by user count
  const sortedDepartments = Object.keys(departmentData).sort(
    (a, b) => departmentData[b]! - departmentData[a]!,
  );

  // Extract top 5 departments and aggregate the rest
  let aggregatedData: UserChartData[] = sortedDepartments
    .slice(0, 5)
    .map((department) => ({
      name: department,
      value: departmentData[department]!,
    }));

  const remainingCount = sortedDepartments
    .slice(5)
    .reduce((sum, department) => sum + departmentData[department]!, 0);
  if (remainingCount > 0) {
    // Add 'Others' category for remaining departments
    aggregatedData.push({ name: "Others", value: remainingCount });
  }

  return (
    <ResponsiveContainer width="100%" height={350} className={"pl-4"}>
      <PieChart>
        <Legend layout="vertical" verticalAlign="top" align="left" />
        <Pie
          data={aggregatedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabels}
          outerRadius={160}
          fill="#8884d8"
          dataKey="value"
        >
          {aggregatedData!.map((entry: any, index: number) => (
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
