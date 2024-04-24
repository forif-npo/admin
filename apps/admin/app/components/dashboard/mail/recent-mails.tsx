"use client";
import useSWR from "swr";
import { Mail } from "../../../types/mail";
import { MailList } from "./mail-list";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function RecentMails() {
  const { data, error } = useSWR<Mail[]>("/api/gmail", fetcher);

  if (error) return <div>Failed to load messages</div>;
  if (!data) return <div>메일을 불러오는 중입니다...</div>;
  return <MailList mails={data} />;
}
