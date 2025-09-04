import { getUserSectionsAPI } from "@/lib/server/sections";
import { getCurrentUser } from "@/lib/server/auth";
import { Section } from "@/types/section";
import SectionList from "./components/SectionList";
import { HeaderShell } from "@/components/common/HeaderShell";

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) return <div className="container p-8">Not authenticated</div>;

  const sections: Section[] = await getUserSectionsAPI(user.uid);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* <HeaderShell
        createConfig={}
        title="Your Progress"
        subtitle="Manage your learning sections and track growth"
        onCreate={(values) => console.log("Create Section:", values)}
      /> */}
      <SectionList sections={sections} />
    </div>
  );
}
