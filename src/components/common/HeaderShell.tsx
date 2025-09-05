"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { FieldConfig } from "@/types";
import { ContentModal } from "../modal/ContentModal";
import { InfoModal } from "../modal/InfoModal";

type HeaderShellProps = {
  shellName: string
  title: string;
  subtitle?: string;
  createdAt?: Date | string | number;
  createConfig?: FieldConfig[];
  editConfig?: FieldConfig[];
  completeConfig?: FieldConfig[];
  defaultValues?: Record<string, any>;
  onCreate?: (values: Record<string, any>) => void;
  onEdit?: (values: Record<string, any>) => void;
  onComplete?: (values: Record<string, any>) => void;
  onDelete?: () => void;
};

export default function HeaderShell({
  shellName,
  title,
  subtitle,
  createdAt,
  createConfig,
  editConfig,
  defaultValues = {},
  onCreate,
  onEdit,
  onComplete,
  onDelete,
}: HeaderShellProps) {
  const [modal, setModal] = useState<null | "create" | "edit" | "delete">(null);

  return (
    <div className="mb-6 p-4 rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          {createdAt && (
            <p className="text-sm text-muted-foreground">
              Created on {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {onCreate && (
            <Button onClick={() => setModal("create")}>
              <Plus className="h-4 w-4 mr-2" /> Create {shellName}</Button>
          )}
          {onComplete && (
            <Button onClick={onComplete}>
              <Plus className="h-4 w-4 mr-2" /> Complete {shellName}</Button>
          )}
        </div>
      </div>

      {/* Create */}
      {modal === "create" && createConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Create New"
          description="Fill in the details to create"
          fields={createConfig}
          onSubmit={onCreate!}
        />
      )}

      {/* Edit */}
      {modal === "edit" && editConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Update"
          description="Update the details"
          fields={editConfig}
          defaultValues={defaultValues}
          onSubmit={onEdit!}
        />
      )}

      {/* Delete */}
      {modal === "delete" && (
        <InfoModal
          open
          setOpen={() => setModal(null)}
          title="Confirm Delete"
          description="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          onConfirm={() => {
            onDelete?.();
            setModal(null);
          }}
        />
      )}
    </div>
  );
}
