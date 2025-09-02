export type PhaseType = "Learn" | "Practice" | "Project";

export type Phase = {
  id: string;
  title: string;
  type: PhaseType;
  description?: string;
  completed: boolean;
  progress: number;
  createdAt: Date;
  updatedAt?: Date;
};
