export interface TopicCompletion {
  completed: boolean;
  summary?: string;
  timeSpentMinutes?: number;
  completedAt?: string;
}

export interface Topic {
  id: string;
  phaseId: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  completion?: TopicCompletion;
}
