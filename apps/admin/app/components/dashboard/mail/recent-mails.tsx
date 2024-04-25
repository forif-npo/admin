"use client";
import useSWR from "swr";
import fetcher from "../../../actions/fetcher";
import { Mail } from "../../../types/mail";
import MailSkeleton from "../../skeleton/mail-skeleton";
import { MailList } from "./mail-list";

export default function RecentMails() {
  const { data, error } = useSWR<Mail[]>("/api/gmail", fetcher);

  if (error) return <div>Failed to load messages</div>;
  if (!data) return <MailSkeleton />;
  return <MailList mails={data} />;
}
