// src/app/progress/components/PhaseCard.tsx
import Link from "next/link";
import { Phase } from "@/types";

export default function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{phase.title}</h3>
        <span
          className={`px-2 py-1 text-xs rounded ${
            phase.type === "Learn"
              ? "bg-blue-100 text-blue-600"
              : phase.type === "Practice"
              ? "bg-green-100 text-green-600"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          {phase.type}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{phase.description}</p>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`text-sm ${
            phase.completed ? "text-green-600" : "text-gray-400"
          }`}
        >
          {phase.completed ? "Completed" : "In Progress"}
        </span>
        <Link
          href={`/progress/${phase.sectionId}/phase/${phase.id}`}
          className="text-sm text-blue-500 hover:underline"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
