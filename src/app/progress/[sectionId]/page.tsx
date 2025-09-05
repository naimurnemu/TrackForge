// app/progress/[sectionId]/page.tsx
import { notFound } from "next/navigation";
import { getSectionByIdAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { getPhasesBySectionIdAPI } from "@/lib/server/phases";
import { PhaseList } from "./components/PhaseList";
import { Button } from "@/components/ui/button";
import SectionHeader from "./components/SectionHeader";
import Link from "next/link";


export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const userId = user.uid;
  const { sectionId } = await params;

  const section = await getSectionByIdAPI(userId, sectionId);
  if (!section) return notFound();

  const phases = await getPhasesBySectionIdAPI(user.uid, sectionId);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <SectionHeader shellName="Phase" section={section} userId={userId} />
      <PhaseList phases={phases} sectionId={sectionId} />
    </div>
  );
}