"use client";
import { protos } from "@google-analytics/data";
import useSWR from "swr";
import CardSkeleton from "../../skeleton/card-skeleton";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TodayPageView() {
  const { data, error } = useSWR<
    protos.google.analytics.data.v1beta.IRunReportResponse[]
  >(
    "/api/analytics?startDate=yesterday&endDate=today&metrics=screenPageViews",
    fetcher,
  );
  const value = data?.[0]?.rows?.[0]?.metricValues?.[0]?.value ?? "0";
  if (error) return <div>Failed to load value</div>;
  if (!data) return <CardSkeleton />;
  return (
    <>
      <div className="text-2xl font-bold">
        <div className="text-2xl font-bold">
          {Number(value).toLocaleString()}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </>
  );
}
