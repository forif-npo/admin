import { ArrowDownIcon } from "@repo/ui/assets/icons/arrow-down-icon";
import { ArrowRightIcon } from "@repo/ui/assets/icons/arrow-right-icon";
import { ArrowUpIcon } from "@repo/ui/assets/icons/arrow-up-icon";
import { CheckCircledIcon } from "@repo/ui/assets/icons/check-circled-icon";
import { CircleIcon } from "@repo/ui/assets/icons/circle-icon";
import { CrossCircledIcon } from "@repo/ui/assets/icons/cross-circled-icon";
import { QuestionMarkCircledIcon } from "@repo/ui/assets/icons/question-mark-circled-icon";
import { StopwatchIcon } from "@repo/ui/assets/icons/stop-watch-icon";
interface Data {
  value: string;
  label: string;
  icon: any;
}

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses: Data[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities: Data[] = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
