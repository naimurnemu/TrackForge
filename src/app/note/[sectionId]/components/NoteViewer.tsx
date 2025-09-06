"use client";

import { Button } from "@/components/ui/button";

export default function NoteViewer({
  content,
  onEdit,
}: {
  content: string;
  onEdit: () => void;
}) {
  return (
    <div className="space-y-2">
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Button size="sm" variant="outline" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}
