import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, BookOpen, Folder } from "lucide-react";
import { Section } from "@/types";
import { getUserSectionsAPI } from "@/lib/server/progress";
import { getCurrentUser } from "@/lib/server/auth";

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  if (!user) {
    // This should normally never happen because middleware protects /progress
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Not authenticated</p>
      </div>
    );
  }
  
  const sections : Section[] = await getUserSectionsAPI(user.uid);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Progress</h1>
          <p className="text-muted-foreground">
            Manage your learning sections and track growth
          </p>
        </div>
        <Button asChild>
          <Link href="/progress/create-section">
            <Plus className="h-4 w-4 mr-2" />
            New Section
          </Link>
        </Button>
      </div>

      {/* Empty State */}
      {sections.length === 0 ? (
        <Card className="text-center py-16">
          <CardHeader>
            <Folder className="h-12 w-12 mx-auto text-muted-foreground" />
            <CardTitle>No sections yet</CardTitle>
            <CardDescription>
              Start by creating your first learning section.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/progress/create-section">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Section
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        /* Sections Grid */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section: Section) => (
            <Card key={section.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
                <CardDescription>
                  {section.createdAt
                    ? new Date(section.createdAt).toLocaleDateString()
                    : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {section.description && (
                  <p className="text-sm text-foreground">{section.description}</p>
                )}
                {section.target && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Target: </span>
                    {section.target}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/progress/${section.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Open Section
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
