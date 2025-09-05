"use client";

import HeaderShell from "@/components/common/HeaderShell";
import { phaseFormConfig, sectionForms } from "@/helpers/form-config";
import { createPhaseAPI } from "@/lib/server/phases";
import { createSectionAPI, deleteSectionAPI, updateSectionAPI } from "@/lib/server/sections";
import { PhaseType, Section } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProgressHeaderProps {
  shellName: string
  userId: string;
  section: Section
}

export default function ProgressHeader({ userId, section, shellName }: ProgressHeaderProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { title, description, target, createdAt, updatedAt, id: sectionId } = section;

  const handleCreate = async (values: { title: string; description: string; type: PhaseType }) => {
    setError(null);
    setLoading(true);

    try {
      const data = await createPhaseAPI({
        userId,
        sectionId,
        ...values
      });

      if (data?.success && data.data?.phaseId) {
        toast.success(`Successfully created ${values.title}`, {
          description: values.description,
          closeButton: true,
        })
        router.refresh();
        router.refresh();
      } else {
        setError(data?.message || "Failed to create phase");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      toast.error(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (values: { title: string; description: string; type: PhaseType }) => {
    setError(null);
    try {
      const success = await updateSectionAPI(userId, sectionId, values);

      if (success) {
        toast.success(`Successfully updated ${values.title}`, {
          description: values.description,
          closeButton: true,
        })
        router.refresh();
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    setError(null);
    try {
      const success = await deleteSectionAPI(userId, sectionId);

      if (success) {
        toast.success(`Successfully deleted ${section.title}`, {
          description: section.description,
          closeButton: true,
        })
        router.replace("/progress");
        router.refresh();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <HeaderShell
        shellName={shellName}
        createConfig={phaseFormConfig}
        title={title}
        subtitle={target}
        description={description}
        createdAt={createdAt}
        updatedAt={updatedAt}
        defaultValues={section}
        loading={loading}
        editConfig={sectionForms}
        onCreate={(values) => handleCreate(values)}
        onEdit={(values) => handleEdit(values)}
        onDelete={handleDelete}
      />

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
