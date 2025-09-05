"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { FieldConfig } from "@/types";
import { ContentModal } from "../modal/ContentModal";
import { InfoModal } from "../modal/InfoModal";

type HeaderShellProps = {
  shellName: string
  title: string;
  subtitle?: string;
  description?: string;
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
  createConfig?: FieldConfig[];
  editConfig?: FieldConfig[];
  completeConfig?: FieldConfig[];
  defaultValues?: Record<string, any>;
  loading?: boolean;
  onCreate?: (values: Record<string, any>) => void;
  onEdit?: (values: Record<string, any>) => void;
  onComplete?: (values: Record<string, any>) => void;
  onDelete?: () => void;
};

export default function HeaderShell({
  shellName,
  title,
  subtitle,
  description,
  createdAt,
  updatedAt,
  createConfig,
  editConfig,
  completeConfig,
  defaultValues = {},
  loading,
  onCreate,
  onEdit,
  onComplete,
  onDelete,
}: HeaderShellProps) {
  const [modal, setModal] = useState<null | "create" | "edit" | "delete" | "complete">(null);

  console.log(
    // shellName,
    // title,
    // subtitle,
    // description,
    // createdAt,
    // createConfig,
    // editConfig,
    defaultValues,
    // onCreate,
    // onEdit,
    // onComplete,
    // onDelete,
  );

  return (
    <div className="mb-6 p-4 rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative">
        <div className="space-y-4">
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              )}
            </h2>

            {createdAt && (
              <p className="text-sm text-muted-foreground -mt-2">
                Created on{" "}
                <span className="font-medium text-foreground">
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            )}

            {subtitle && (
              <h5 className="text-lg font-semibold text-foreground/90">
                {subtitle}
              </h5>
            )}

            {description && (
              <p className="text-sm leading-relaxed text-muted-foreground max-w-prose">
                {description}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" onClick={() => setModal("edit")}>
                <Pencil className="h-4 w-4 mr-2" /> Update
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" onClick={() => setModal("delete")}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            )}
          </div>
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

        <div className="absolute bottom-2 right-4"> 
          {updatedAt && (
            <p className="text-sm text-muted-foreground">
              Updated on{" "}
              <span className="font-medium text-foreground">
                {new Date(updatedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          )}
        </div>

      </div>

      {/* Create */}
      {modal === "create" && createConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Create New"
          // confirmLabel="Create"
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

      {/* Complete */}
      {modal === "complete" && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Confirm Complete"
          description="Are you sure you want to complete this item?"
          // confirmLabel="Complete"
          fields={completeConfig}
          onSubmit={onComplete!}
        />
      )}

      {/* Delete */}
      {modal === "delete" && (
        <InfoModal
          open
          setOpen={() => setModal(null)}
          title="Confirm Delete"
          description={`Are you sure you want to delete ${title} ${shellName} ?`}
          confirmLabel="Delete"
          destructive
          onConfirm={() => {
            onDelete?.();
            setModal(null);
          }}
        />
      )}
    </div>
  );
}
