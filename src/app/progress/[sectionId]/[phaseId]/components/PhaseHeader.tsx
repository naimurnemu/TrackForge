"use client";

import HeaderShell from "@/components/common/HeaderShell";
import { phaseFormConfig, topicFormConfig } from "@/helpers/form-config";
import { deletePhaseAPI, updatePhaseAPI } from "@/lib/server/phases";
import { createTopicAPI } from "@/lib/server/topics";
import { Phase, PhaseType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PhaseHeaderProps {
  userId: string;
  sectionId: string;
  phase: Phase
}

export default function PhaseHeader({ userId, sectionId, phase }: PhaseHeaderProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { title, description, type, createdAt, updatedAt, progress, id: phaseId } = phase;

  const handleCreate = async (values: {
    title: string;
    description: string
  }) => {
    setError(null);
    setLoading(true);

    try {
      const data = await createTopicAPI({
        userId,
        sectionId,
        phaseId,
        ...values,
      });

      if (data?.success && data.data?.topicId) {
        toast.success(`Successfully created ${values.title}`, {
          description: values.description,
          closeButton: true,
        })
        router.refresh();
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
    setLoading(true);
    
    try {
      const success = await updatePhaseAPI(userId, sectionId, phaseId, values);

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
      const success = await deletePhaseAPI(userId, sectionId, phaseId);

      if (success) {
        toast.success(`Successfully deleted ${title}`, {
          description: description,
          closeButton: true,
        })
        router.replace(`/progress/${sectionId}`);
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
        shellName="Topic"
        createConfig={topicFormConfig}
        title={title}
        description={description}
        phaseType={type}
        createdAt={createdAt}
        updatedAt={updatedAt}
        defaultValues={phase}
        progress={progress}
        loading={loading}
        editConfig={phaseFormConfig}
        onCreate={(values) => handleCreate(values as { title: string; description: string })}
        onEdit={(values) => handleEdit(values as { title: string; description: string; type: PhaseType })}
        onDelete={handleDelete}
      />

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
