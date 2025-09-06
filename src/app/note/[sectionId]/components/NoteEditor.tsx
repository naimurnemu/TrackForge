// app/note/[sectionId]/components/NoteEditor.tsx
"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";

export default function NoteEditor({
  initialValue,
  onSave,
  onCancel,
}: {
  initialValue: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="space-y-3">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSave(value)}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
