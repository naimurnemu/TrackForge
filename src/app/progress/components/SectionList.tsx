"use client";

import Link from "next/link";
import { Section } from "@/types/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Folder, BookOpen, FilePlus2 } from "lucide-react";

interface SectionListProps {
  sections: Section[];
}

export default function SectionList({ sections }: SectionListProps) {
  const sortedSections = [...sections].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (sections.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-4 bg-muted rounded-full mb-4">
          <Folder className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No sections yet</h2>
        <p className="text-muted-foreground mb-6">
          Start by creating your first learning section.
        </p>
        <Button variant="ghost">
          <FilePlus2 className="h-4 w-4 mr-2" />
          Create Your First Section
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedSections.map((section) => (
        <Card key={section.id} className="flex flex-col h-full gap-3">
          <CardHeader>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Folder className="h-4 w-4" />
              <span className="text-sm">Objective</span>
            </div>
            <CardTitle className="text-xl">{section.title}</CardTitle>
            <CardDescription>
              Created on {new Date(section.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 space-y-2">
            {section.target && (
              <p className="text-sm">
                <span className="text-muted-foreground">🎯 Target: </span>
                {section.target}
              </p>
            )}
            {section.description?.length ? (
              <p className="text-sm text-foreground leading-relaxed">
                {section.description}
              </p>
            ) : null}
          </CardContent>

          <CardFooter>
            <Button asChild variant="default" className="w-full">
              <Link href={`/progress/${section.id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Open
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
