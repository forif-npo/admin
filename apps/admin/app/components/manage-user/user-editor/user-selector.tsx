import { User } from "@repo/types/src/user";
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
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface UserSelectorProps {
  users: User[];
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User>>;
}

export function UserSelector({
  users,
  selectedUser,
  setSelectedUser,
}: UserSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="수정할 유저를 선택해주세요"
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[300px]"
        >
          {selectedUser ? selectedUser.userName : "수정할 유저를 선택해주세요"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0">
        <ScrollArea className="w-full h-80">
          <Command>
            <CommandInput placeholder="유저를 검색해보세요!" />
            <CommandEmpty>일치하는 검색결과가 없습니다.</CommandEmpty>
            <CommandGroup heading="유저">
              {users.map((user) => (
                <CommandItem
                  key={user.userId}
                  onSelect={() => {
                    setSelectedUser(user);
                    setOpen(false);
                  }}
                >
                  {user.userName} - {user.department} - {user.userId}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedUser?.userId === user.userId
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
