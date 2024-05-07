"use client";
import { Study } from "@repo/types/src/study";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useEffect, useState } from "react";
import { AddTagFormDialog } from "./add-tag-form";

const availableTimes = [
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

const weekDays = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const levels = ["매우 쉬움", "쉬움", "중간", "어려움", "매우 어려움"];
const interviews = ["면접을 보지 않습니다.", "면접을 봅니다."];

// 수정할 수 있는 항목만을 담은 스터디 인터페이스
interface EditStudy
  extends Omit<
    Study,
    "studyId" | "studyName" | "mentorName" | "image" | "studyType"
  > {}

export function EditStudyForm({ study }: { study: Study }) {
  const [data, setData] = useState<Study>({
    startTime: study.startTime,
    endTime: study.endTime,
    tags: study.tags, //임시
    weekDay: study.weekDay,
    level: study.level,
    interview: study.interview,
    image: study.image,
    mentorName: study.mentorName,
    studyId: study.studyId,
    studyName: study.studyName,
    studyType: study.studyType,
  });

  //prop으로 전달되는 스터디 값이 셀렉터에 의해 변경될 시 기본 값도 변경시킵니다.
  useEffect(() => {
    setData({
      startTime: study.startTime,
      endTime: study.endTime,
      tags: study.tags, //임시
      weekDay: study.weekDay,
      level: study.level,
      interview: study.interview,
      image: study.image,
      mentorName: study.mentorName,
      studyId: study.studyId,
      studyName: study.studyName,
      studyType: study.studyType,
    });
  }, [study]);

  const handleValueChange = (
    key: keyof EditStudy,
    value: string | number | boolean,
  ): void => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">시작 시간 및 종료 시간</h2>
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-row items-center gap-4">
            <Select
              onValueChange={(val) => handleValueChange("startTime", val)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={study.startTime} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableTimes.map((time) => (
                    <SelectItem value={time} key={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-sm">부터</span>
            <Select onValueChange={(val) => handleValueChange("endTime", val)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={study.endTime} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableTimes.map((time) => (
                    <SelectItem value={time} key={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            disabled={
              data.startTime === study.startTime &&
              data.endTime === study.endTime
            }
          >
            수정
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          진행 시간은 스터디 지원일이 시작되면 수정이 불가능합니다.
        </p>
      </div>
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">진행 요일</h2>
        <div className="flex flex-row justify-between items-center">
          <Select onValueChange={(val) => handleValueChange("weekDay", val)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={weekDays[study.weekDay]} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {weekDays.map((day, idx) => (
                  <SelectItem value={idx.toString()} key={idx + 1}>
                    {day}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button disabled={data.weekDay === study.weekDay}>수정</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          진행 요일은 스터디 지원일이 시작되면 수정이 불가능합니다.
        </p>
      </div>
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">난이도</h2>
        <div className="flex flex-row justify-between items-center">
          <Select onValueChange={(val) => handleValueChange("level", val)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue
                placeholder={`${levels[study.level - 1]}(${study.level})`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>기준 : 경력 없는 비전공자</SelectLabel>
                {levels.map((level, idx) => (
                  <SelectItem value={(idx + 1).toString()} key={idx + 1}>
                    {level}({idx + 1})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button disabled={data.level === study.level}>수정</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          코딩을 한 번도 해보지 않은 비전공자를 기준으로 난이도를 설정해주세요.
        </p>
      </div>
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">면접 여부</h2>
        <div className="flex flex-row justify-between items-center">
          <Select onValueChange={(val) => handleValueChange("interview", val)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={interviews[study.interview ? 1 : 0]} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {interviews.map((interview, idx) => (
                  <SelectItem value={idx.toString()} key={idx}>
                    {interview}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button disabled={data.interview === study.interview}>수정</Button>
        </div>
        <p className="text-sm text-muted-foreground">
          면접 여부는 스터디 지원일이 시작되면 수정이 불가능합니다.
        </p>
      </div>
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">태그</h2>
        <div className="flex flex-row justify-between md:items-center">
          <div className="flex flex-row items-center gap-2">
            {Object.entries(data.tags).map(([tag, color]) => (
              <Badge key={`${tag}-${color}`}>{tag}</Badge>
            ))}
          </div>
          <AddTagFormDialog study={study} />
        </div>
      </div>
    </div>
  );
}
