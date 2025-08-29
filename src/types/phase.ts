import { Topic } from "./topic";

export type PhaseType = "Learn" | "Practice" | "Project";

export interface Phase {
  id: string;
  sectionId: string;
  userId: string;
  title: string;
  description?: string;
  type: PhaseType;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  topics?: Topic[];
}
