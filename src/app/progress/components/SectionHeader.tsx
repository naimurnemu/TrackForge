"use client";

import HeaderShell from "@/components/common/HeaderShell";
import { sectionForms } from "@/helpers/form-config";
import { createSectionAPI } from "@/lib/server/sections";
import { useState } from "react";
// import { useRouter } from "next/router";


export default function SectionHeader() {
  // const { router } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true);
    setError(null);

    try {
      const data = await createSectionAPI({ ...values, userId });

      if (data?.data?.sectionId) {
        // router.push("/progress");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderShell
      createConfig={sectionForms}
      title="Learning Progress"
      subtitle="Manage your learning sections and track growth"
      onCreate={(values) => handleSubmit(values)}
    />
  );
}
