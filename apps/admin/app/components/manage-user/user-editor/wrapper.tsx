"use client";
import { User } from "@repo/types/src/user";
import { Separator } from "@repo/ui/components/ui/separator";
import { useState } from "react";
import { EditUserForm } from "./edit-user-form";
import { UserSelector } from "./user-selector";

export default function EditorWrapper({ data }: { data: User[] | undefined }) {
  if (!data) return null;
  const [selectedUser, setSelectedUser] = useState<User>(data[0]!);
  console.log(selectedUser);

  return (
    <div className="h-full flex-col md:flex">
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <div>
          <h2 className="text-lg font-semibold w-full">
            유저 정보를 수정할 수 있습니다.
          </h2>
          <p className="text-muted-foreground text-sm">
            다음과 같은 항목은 수정이 불가능합니다 : <strong>이메일</strong>
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-2 sm:justify-end">
          <UserSelector
            users={data}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
      </div>
      <Separator />
      <div className="mt-4">
        <EditUserForm user={selectedUser} />
      </div>
    </div>
  );
}
