import { SummarySection } from "@/types";
import { Target } from "lucide-react";

export default function BookHeader({ section }: { section: SummarySection }) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-bold">{section.title}</h1>
      <p className="text-muted-foreground">{section.description}</p>

      {section.target && (
        <p className="flex items-center gap-2 text-sm">
          <Target className="h-4 w-4 text-primary" />
          <span>{section.target}</span>
        </p>
      )}
    </header>
  );
}
