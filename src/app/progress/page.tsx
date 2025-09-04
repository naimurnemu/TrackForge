import { LayoutShell } from "../../components/common/LayoutShell";
import { SectionCard } from "./components/SectionCard";
import { getUserSectionsAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Section } from "@/types";

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const sections: Section[] = await getUserSectionsAPI(user.uid);

  return (
    <LayoutShell
      title="Your Progress"
      subtitle="Manage your learning sections and track growth"
      showCreateButton
      createHref="/progress/create"
      createLabel="New Section"
    >
      {sections.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-4 bg-muted rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">No sections yet</h2>
          <p className="text-muted-foreground mb-6">
            Start by creating your first learning section.
          </p>
          <Button asChild>
            <Link href="/progress/create">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Your First Section
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      )}
    </LayoutShell>
  );
}