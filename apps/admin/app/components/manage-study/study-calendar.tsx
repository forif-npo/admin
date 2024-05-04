"use client";
import { Study } from "@repo/types/src/study";
import { Calendar } from "@repo/ui/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";

export default function StudyCalendar({ data }: { data: Study[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const todayStudies = date
    ? data.filter((study) => study.weekDay === date.getDay())
    : [];

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-fit h-fit"
        fromYear={2024}
        locale={ko}
      />
      <Card className="flex-1">
        <CardHeader>{format(date!, "yyyy년 MM월 dd일")}</CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="flex flex-col gap-4">
              {todayStudies.map((study) => (
                <li key={study.studyId}>
                  {study.startTime.slice(0, 5)} - {study.endTime.slice(0, 5)} :{" "}
                  {study.studyName}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
