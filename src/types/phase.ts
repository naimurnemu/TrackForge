export type PhaseType = "Learn" | "Practice" | "Assessment";

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
