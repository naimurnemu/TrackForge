"use client";

import HeaderShell from "@/components/common/HeaderShell";
import { phaseFormConfig, sectionFormConfig } from "@/helpers/form-config";
import { createPhaseAPI } from "@/lib/server/phases";
import { deleteSectionAPI, updateSectionAPI } from "@/lib/server/sections";
import { PhaseType, Section } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProgressHeaderProps {
  userId: string;
  section: Section
}

export default function ProgressHeader({ userId, section }: ProgressHeaderProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { title, description, target, createdAt, updatedAt, id: sectionId } = section;

  const handleCreate = async (values: { 
    title: string; 
    description: string; 
    type: PhaseType 
  }) => {
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

  const handleEdit = async (values: {
    title: string;
    description: string;
    target: string;
  }) => {
    setError(null);
    setLoading(true);

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
    setLoading(true);
    
    try {
      const success = await deleteSectionAPI(userId, sectionId);

      if (success) {
        toast.success(`Successfully deleted ${title}`, {
          description: description,
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
        shellName="Phase"
        createConfig={phaseFormConfig}
        title={title}
        subtitle={target}
        description={description}
        createdAt={createdAt}
        updatedAt={updatedAt}
        defaultValues={section}
        loading={loading}
        editConfig={sectionFormConfig}
        onCreate={(values) => handleCreate(values as { title: string; description: string; type: PhaseType })}
        onEdit={(values) => handleEdit(values as { title: string; description: string; target: string })}
        onDelete={handleDelete}
      />

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
