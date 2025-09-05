"use client";

import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Skeleton } from "../ui/skeleton";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/progress", label: "My Progress" },
    { href: "/summaries", label: "Summaries" },
    { href: "/notes", label: "Notes" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/logos/logo.png"}
              alt={"Logo"}
              width={200}
              height={180}
              className="h-12 w-auto"
            />
            <Link href="/dashboard" className="text-2xl font-bold text-primary">
              TrackForge
            </Link>
          </div>

          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  pathname === link.href &&
                  "text-primary after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-full after:bg-primary after:rounded"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {loading ? (
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-28" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.photoURL || ""}
                        alt={user.displayName || "User"}
                      />
                      <AvatarFallback>
                        {user.displayName
                          ? user.displayName.charAt(0).toUpperCase()
                          : user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
