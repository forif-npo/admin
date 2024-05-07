"use client";
import { Study } from "@repo/types/src/study";
import { Separator } from "@repo/ui/components/ui/separator";
import { useState } from "react";
import { EditStudyForm } from "./edit-study-form";
import { StudySelector } from "./study-selector";

export default function EditorWrapper({ data }: { data: Study[] }) {
  const [selectedStudy, setSelectedStudy] = useState<Study>(data[0]!);

  return (
    <div className="h-full flex-col md:flex">
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <div>
          <h2 className="text-lg font-semibold w-full">
            스터디 정보를 수정할 수 있습니다.
          </h2>
          <p className="text-muted-foreground text-sm">
            다음과 같은 항목은 수정이 불가능합니다 :{" "}
            <strong>
              스터디 고유 아이디, 스터디 이름, 멘토 이름, 스터디 종류
            </strong>
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-2 sm:justify-end">
          <StudySelector
            studies={data}
            selectedStudy={selectedStudy}
            setSelectedStudy={setSelectedStudy}
          />
        </div>
      </div>
      <Separator />
      <div className="mt-4">
        <EditStudyForm study={selectedStudy} />
      </div>
    </div>
  );
}
