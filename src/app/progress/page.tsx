import { getUserSectionsAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import SectionList from "./components/SectionList";
import ProgressHeader from "./components/ProgressHeader";
import { Section } from "@/types";

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) return;

  const sections: Section[] = await getUserSectionsAPI(user.uid);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <ProgressHeader userId={user.uid} />
      <SectionList sections={sections} />
    </div>
  );
}
