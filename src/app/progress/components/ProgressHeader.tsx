"use client";

import HeaderShell from "@/components/common/HeaderShell";
import { sectionForms } from "@/helpers/form-config";
import { createSectionAPI } from "@/lib/server/sections";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProgressHeaderProps {
  shellName: string;
  userId: string;
}

export default function ProgressHeader({ userId, shellName }: ProgressHeaderProps) {
  const router  = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { title: string; description: string; target: string }) => {
    setError(null);

    try {
      const data = await createSectionAPI({ ...values, userId });

      if (data?.data?.sectionId) {
        toast.success(`Successfully created ${values.title}`, {
          description: values.title,
          closeButton: true,
        })
        router.refresh();
      } else {
        setError(data?.message || "Failed to create section");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      toast.error(err instanceof Error ? err.message : "An unknown error occurred");
    } 
  };

  return (
    <>
      <HeaderShell
        shellName={shellName}
        createConfig={sectionForms}
        title="Your Learning Journey"
        subtitle="Stay organized and see how far you’ve come."
        onCreate={(values) => handleSubmit(values)}
      />

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
