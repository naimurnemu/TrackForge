// src/app/progress/components/TopicItem.tsx
"use client";

import { useState } from "react";
import { updateTopic } from "@/lib/db";

export default function TopicItem({ topic }: { topic: any }) {
  const [isCompleted, setCompleted] = useState(topic.isCompleted);

  const handleToggle = async () => {
    if (!isCompleted) {
      const summary = prompt("Write a short summary before completing:");
      const timeSpent = prompt("How many minutes did you spend?");
      if (!summary || !timeSpent) return;
      await updateTopic(topic.id, {
        isCompleted: true,
        summary,
        timeSpentMinutes: Number(timeSpent),
        completedAt: new Date(),
      });
    } else {
      await updateTopic(topic.id, { isCompleted: false });
    }
    setCompleted(!isCompleted);
  };

  return (
    <li className="flex items-center justify-between border rounded p-3 bg-white">
      <span className={isCompleted ? "line-through text-gray-500" : ""}>
        {topic.title}
      </span>
      <button
        onClick={handleToggle}
        className={`px-3 py-1 rounded text-sm ${
          isCompleted
            ? "bg-gray-200 text-gray-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isCompleted ? "Undo" : "Complete"}
      </button>
    </li>
  );
}
