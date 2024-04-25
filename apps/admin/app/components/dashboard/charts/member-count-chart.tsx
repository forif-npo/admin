"use client";

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    year: "2015",
    total: 10,
  },
  {
    year: "2016",
    total: 32,
  },
  {
    year: "2017",
    total: 30,
  },
  {
    year: "2018",
    total: 25,
  },
  {
    year: "2019",
    total: 28,
  },
  {
    year: "2020",
    total: 29,
  },
  {
    year: "2021",
    total: 62,
  },
  {
    year: "2022",
    total: 89,
  },
  {
    year: "2023",
    total: 205,
  },
  {
    year: "2024",
    total: 289,
  },
];

export function MemberCountChart() {
  const renderLabels = (props: any) => {
    const { x, y, width, index, value } = props;
    const isLast = index === data.length - 1; // Check if it's the last item

    return (
      <text
        x={x + width / 2}
        y={y}
        dy={-6}
        fontSize={12}
        textAnchor="middle"
        className={`${isLast ? "font-bold text-sm fill-primary" : "text-xs fill-muted-foreground"}`}
      >
        {value}
      </text>
    );
  };
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="year"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}명`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        >
          <LabelList dataKey="total" position="top" content={renderLabels} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
