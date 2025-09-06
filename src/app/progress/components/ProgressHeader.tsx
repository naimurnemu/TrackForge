"use client";

import HeaderShell from "@/components/common/HeaderShell";
import { sectionFormConfig } from "@/helpers/form-config";
import { createSectionAPI } from "@/lib/server/sections";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProgressHeaderProps {
  userId: string;
}

export default function ProgressHeader({ userId }: ProgressHeaderProps) {
  const router  = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { title: string; description: string; target: string }) => {
    setError(null);
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderShell
        shellName="Section"
        createConfig={sectionFormConfig}
        title="Your Learning Journey"
        subtitle="Stay organized and see how far you’ve come."
        onCreate={(values) => handleSubmit(values)}
      />

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
