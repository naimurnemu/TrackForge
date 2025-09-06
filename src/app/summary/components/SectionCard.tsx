import Link from "next/link";
import { Section } from "@/types/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BookOpen, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionCardProps {
  section: Section;
}

export default function SectionCard({ section }: SectionCardProps) {
  const { title, description, target, id, createdAt } = section;
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Summary Book
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        {description && (<CardDescription className="line-clamp-2">
          {description || "No description provided."}
        </CardDescription>)}
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        {target && (
          <p className="text-sm flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="truncate">{section.target}</span>
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/summary/${id}`}>Open Summary</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
