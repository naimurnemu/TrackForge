export type Topic = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  summary?: string;
  timeSpentMinutes?: number;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
};