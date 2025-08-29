"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Button variant="ghost" size="sm" disabled><Sun className="h-4 w-4" /></Button>;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex rounded-md border">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={current === "light" ? "bg-accent" : ""}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("dark")}
        className={current === "dark" ? "bg-accent" : ""}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("system")}
        className={theme === "system" ? "bg-accent" : ""}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}