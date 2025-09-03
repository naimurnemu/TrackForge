import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  section: {
    id: string;
    title: string;
    description?: string;
    target?: string;
    createdAt: Date | string | number;
  };
};

export function SectionCard({ section }: Props) {
  const createdAt = section.createdAt 
    ? new Date(section.createdAt).toLocaleDateString() 
    : "Unknown";

  return (
    <Card key={section.id} className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Folder className="h-4 w-4" />
          <span className="text-sm">Section</span>
        </div>
        <CardTitle className="text-xl">{section.title}</CardTitle>
        <CardDescription>Created on {createdAt}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {section.description && (
          <p className="text-sm text-foreground leading-relaxed">
            {section.description}
          </p>
        )}
        {section.target && (
          <p className="text-sm">
            <span className="text-muted-foreground">🎯 Target: </span>
            {section.target}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild variant="default" className="w-full">
          <Link href={`/progress/${section.id}`}>
            <BookOpen className="h-4 w-4 mr-2" />
            Open Section
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}