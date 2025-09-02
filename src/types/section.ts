export type Section = {
  id: string;
  title: string;
  description?: string;
  target?: string;
  createdAt: Date;
  updatedAt: Date;
  progress?: number; 
};