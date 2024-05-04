"use client";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/overview", label: "개요" },
    { href: "/dashboard/manage-user", label: "부원 관리" },
    { href: "/dashboard/manage-study", label: "스터디 관리" },
    { href: "/dashboard/services", label: "기타 서비스" },
  ];

  return (
    <nav
      className={cn("items-center space-x-4 lg:space-x-6 flex", className)}
      {...props}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn("text-sm font-medium transition-colors", {
            "text-primary": pathname === link.href,
            "text-muted-foreground": pathname !== link.href,
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
