"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { FieldConfig } from "@/types";
import { ContentModal } from "../modal/ContentModal";
import { InfoModal } from "../modal/InfoModal";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

type HeaderShellProps = {
  shellName: string
  title: string;
  subtitle?: string;
  description?: string;
  phaseType?: string;
  progress?: number;
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
  createConfig?: FieldConfig[];
  editConfig?: FieldConfig[];
  completeConfig?: FieldConfig[];
  defaultValues?: Record<string, any>;
  loading?: boolean;
  onCreate?: (values: Record<string, unknown>) => void;
  onEdit?: (values: Record<string, any>) => void;
  onComplete?: (values: Record<string, any>) => void;
  onDelete?: () => void;
};

export default function HeaderShell({
  shellName,
  title,
  subtitle,
  description,
  progress,
  phaseType,
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
    progress,
    // onCreate,
    // onEdit,
    // onComplete,
    // onDelete,
  );

  return (
    <div className="mb-6 p-4 rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative">
        <div className="space-y-4 w-full">
          <div className="space-y-2 border-b pb-4">
            <Badge
              variant="secondary"
              title={`${phaseType} is the phase agenda`}
            >
              {phaseType}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
              {title}
              {loading && (
                <Loader2 className="h-5 w-5 mx-2 animate-spin text-primary" />
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

            {typeof progress === "number" ? (<div className="w-full md:w-2/3 bg-muted rounded-full my-3">
              <Progress className="h-3" value={progress} />
            </div>) : null}

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

      {/* Edit */}
      {modal === "complete" && editConfig && (
        <ContentModal
          open
          setOpen={() => setModal(null)}
          title="Confirm Complete"
          description="Are you sure you want to complete this item?"
          fields={completeConfig ?? []}
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
