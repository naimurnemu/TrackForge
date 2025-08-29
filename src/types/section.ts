import { Phase } from "./phase";

export interface Section {
  id: string;
  userId: string;
  title: string;
  description?: string;
  target?: string;
  createdAt: string;
  updatedAt: string;
  phases?: Phase[];
}
