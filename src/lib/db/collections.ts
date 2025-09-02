import { adminDB } from "./../firebase-admin";

export const getUserSectionCollection = (userId: string) =>
  adminDB.collection("users").doc(userId).collection("sections");

export const getUserSectionDoc = (userId: string, sectionId: string) =>
  getUserSectionCollection(userId).doc(sectionId);

export const getSectionPhaseCollection = (userId: string, sectionId: string) =>
  getUserSectionDoc(userId, sectionId).collection("phases");

export const getSectionPhaseDoc = (
  userId: string,
  sectionId: string,
  phaseId: string
) => getSectionPhaseCollection(userId, sectionId).doc(phaseId);

export const getPhaseTopicCollection = (
  userId: string,
  sectionId: string,
  phaseId: string
) => getSectionPhaseDoc(userId, sectionId, phaseId).collection("topics");

export const getPhaseTopicDoc = (
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string
) => getPhaseTopicCollection(userId, sectionId, phaseId).doc(topicId);

export const getTopicNoteCollection = (topicId: string) =>
  adminDB.collection("topics").doc(topicId).collection("notes");

export const getTopicNoteDoc = (topicId: string, noteId: string) =>
  getTopicNoteCollection(topicId).doc(noteId);
