import { Study } from "@repo/types/src/study";
import { CaretSortIcon } from "@repo/ui/assets/icons/caret-sort-icon";
import { CheckIcon } from "@repo/ui/assets/icons/check-icon";
import { Button } from "@repo/ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@repo/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { cn } from "@repo/ui/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface StudySelectorProps {
  studies: Study[];
  selectedStudy: Study | undefined;
  setSelectedStudy: Dispatch<SetStateAction<Study | undefined>>;
}

export function StudySelector({
  studies,
  selectedStudy,
  setSelectedStudy,
}: StudySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="수정할 스터디를 선택해주세요"
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[300px]"
        >
          {selectedStudy
            ? selectedStudy.studyName
            : "수정할 스터디를 선택해주세요"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0 pr-8">
        <Command>
          <CommandInput placeholder="스터디를 검색해보세요!" />
          <CommandEmpty>일치하는 검색결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="스터디">
            {studies.map((study) => (
              <CommandItem
                key={study.studyId}
                onSelect={() => {
                  setSelectedStudy(study);
                  setOpen(false);
                }}
              >
                {study.studyName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedStudy?.studyId === study.studyId
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
