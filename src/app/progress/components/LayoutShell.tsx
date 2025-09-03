import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showCreateButton?: boolean;
  createHref?: string;
  createLabel?: string;
};

export function LayoutShell({
  children,
  title = "Your Progress",
  subtitle = "Manage your learning journey",
  showCreateButton = false,
  createHref = "/progress/create-section",
  createLabel = "New Section",
}: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {showCreateButton && (
          <Button asChild>
            <Link href={createHref}>
              <Plus className="h-4 w-4 mr-2" />
              {createLabel}
            </Link>
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}