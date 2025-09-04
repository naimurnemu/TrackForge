"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { FieldConfig } from "@/types/fields";
import { ContentModal } from "../modal/ContentModal";
import { InfoModal } from "../modal/InfoModal";

type HeaderShellProps = {
  title: string;
  subtitle?: string;
  createdAt?: Date | string | number;
  createConfig?: FieldConfig[];
  editConfig?: FieldConfig[];
  defaultValues?: Record<string, any>;
  onCreate?: (values: Record<string, any>) => void;
  onEdit?: (values: Record<string, any>) => void;
  onDelete?: () => void;
};

export function HeaderShell({
  title,
  subtitle,
  createdAt,
  createConfig,
  editConfig,
  defaultValues = {},
  onCreate,
  onEdit,
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
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" onClick={() => setModal("edit")}>
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" onClick={() => setModal("delete")}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          )}
        </div>
      </div>

      {/* Create */}
      {modal === "create" && createConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Create"
          description="Fill in the details"
          fields={createConfig}
          onSubmit={onCreate!}
        />
      )}

      {/* Edit */}
      {modal === "edit" && editConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Edit"
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
