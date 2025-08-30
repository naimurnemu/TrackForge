// src/app/progress/[sectionId]/phase/[phaseId]/topic/create/page.tsx
"use client";

import { useState } from "react";
import { createTopic } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function CreateTopicPage({ params }: { params: { sectionId: string; phaseId: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTopic(params.phaseId, { title });
    router.push(`/progress/${params.sectionId}/phase/${params.phaseId}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Create Topic</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Topic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
