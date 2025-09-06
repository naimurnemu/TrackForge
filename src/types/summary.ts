import { Topic } from "./topic";

export interface SummaryPhase {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  topics: Topic[]
  
}

export interface SummarySection {
  id: string;
  title: string;
  description?: string;
  target: string;
  createdAt: string;
  updatedAt: string;
  phases: SummaryPhase[];
}