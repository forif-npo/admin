import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { MailListProps } from "../../../types/mail";

/**
 * Decode base64 string to utf-8
 * @param {string} str base64 string to decode
 */
function btou(str: string) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}

export function MailList({ mails }: MailListProps) {
  console.log(mails);

  const pattern = /^(?:"?­?\s*)?(.+?)(?=\s*<.*>|"?\s*$)/;

  return (
    <ScrollArea className="h-[300px]">
      <div className="flex flex-col gap-2 py-4 pr-4 pt-0">
        {mails.map((mail, idx) => (
          <button
            key={idx}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            )}
            onClick={() => {}}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {
                      mail.headers.find((header) => header.name === "Subject")!
                        .value
                    }
                  </div>
                </div>
                <div className={cn("ml-auto text-xs")}>
                  {formatDistanceToNow(
                    new Date(
                      mail.headers.find(
                        (header) => header.name === "Date",
                      )!.value,
                    ),
                    {
                      addSuffix: true,
                    },
                  )}
                </div>
              </div>
              <div className="text-xs font-medium">
                {
                  mail.headers
                    .find((header) => header.name === "From")
                    ?.value.match(pattern)?.[1]
                }
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {btou(
                mail.parts[0]!.body.data.replace(/-/g, "+").replace(/_/g, "/"),
              ).substring(0, 300)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
