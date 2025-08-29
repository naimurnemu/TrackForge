export interface Note {
  id: string;
  userId: string;
  sectionId?: string;
  phaseId?: string;
  topicId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteBody {
  sectionId?: string;
  phaseId?: string;
  topicId?: string;
  content: string;
}