"use client";
import { HYU_DEPARTMENTS } from "@repo/types/src/departments";
import { User } from "@repo/types/src/user";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
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
// 수정할 수 있는 항목만을 담은 스터디 인터페이스
interface EditUser extends Omit<User, "payment" | "email"> {}

export function EditUserForm({ user }: { user: User }) {
  const [data, setData] = useState<User>({
    userId: user.userId,
    userName: user.userName,
    department: user.department,
    email: user.email,
    payment: user.payment,
    phoneNumber: user.phoneNumber,
  });

  //prop으로 전달되는 스터디 값이 셀렉터에 의해 변경될 시 기본 값도 변경시킵니다.
  useEffect(() => {
    setData({
      userId: user.userId,
      userName: user.userName,
      department: user.department,
      email: user.email,
      payment: user.payment,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  const handleValueChange = (
    key: keyof EditUser,
    value: string | number | boolean,
  ): void => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  console.log(user);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">이름</h2>
        <div className="flex flex-row justify-between items-center">
          <Input
            placeholder={user.userName}
            className="w-[200px]"
            onChange={(e) => handleValueChange("userName", e.target.value)}
          />
          <Button disabled={data.userName === user.userName}>수정</Button>
        </div>
        <p className="text-sm text-destructive">
          절대 본인의 요청 사항 없이 수정하지 말아주세요.
        </p>
      </div>
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">학번</h2>
        <div className="flex flex-row justify-between items-center">
          <Input
            placeholder={user.userId}
            className="w-[200px]"
            onChange={(e) => handleValueChange("userId", e.target.value)}
          />
          <Button disabled={data.userId === user.userId}>수정</Button>
        </div>
        <p className="text-sm text-destructive">
          절대 본인의 요청 사항 없이 수정하지 말아주세요.
        </p>
      </div>
      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">전화번호</h2>
        <div className="flex flex-row gap-4 justify-between items-center">
          <Input
            placeholder={user.phoneNumber}
            className="w-[200px]"
            onChange={(e) => handleValueChange("phoneNumber", e.target.value)}
          />
          <Button disabled={data.phoneNumber === user.phoneNumber}>수정</Button>
        </div>
        <p className="text-sm text-destructive">
          절대 본인의 요청 사항 없이 수정하지 말아주세요.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border bg-card p-6">
        <h2 className="text-base">학과</h2>
        <div className="flex flex-row gap-4 justify-between items-center">
          <Select onValueChange={(val) => handleValueChange("department", val)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={user.department} />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(HYU_DEPARTMENTS).map((department) => (
                <SelectGroup key={department}>
                  <SelectLabel>{department}</SelectLabel>
                  {(HYU_DEPARTMENTS[department] as string[]).map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <Button disabled={data.department === user.department}>수정</Button>
        </div>
        <p className="text-sm text-destructive">
          절대 본인의 요청 사항 없이 수정하지 말아주세요.
        </p>
      </div>
    </div>
  );
}
