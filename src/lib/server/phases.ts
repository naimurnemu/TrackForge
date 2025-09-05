import { PhaseType } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function getPhasesBySectionIdAPI(
  userId: string,
  sectionId: string
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase?userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data.data?.phases ?? [];
  } catch (err) {
    console.error("getPhasesBySectionIdAPI error:", err);
    return [];
  }
}

export async function getPhaseByIdAPI(
  userId: string,
  sectionId: string,
  phaseId: string
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}?userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data.data?.phase ?? null;
  } catch (err) {
    console.error("getPhaseByIdAPI error:", err);
    return null;
  }
}

export async function createPhaseAPI(payload: {
  userId: string;
  sectionId: string;
  title: string;
  type: PhaseType;
  description?: string;
}) {
  try {
    const { userId, sectionId, ...body } = payload;

    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...body }),
      }
    );

    const data = await res.json();
    return data.success ? data : null;
  } catch (err) {
    console.error("createPhaseAPI error:", err);
    return null;
  }
}

export async function updatePhaseAPI(
  userId: string,
  sectionId: string,
  phaseId: string,
  updates: {
    title?: string;
    type?: "Learn" | "Practice" | "Project";
    description?: string;
  }
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}?userId=${userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("updatePhaseAPI error:", err);
    return false;
  }
}

export async function deletePhaseAPI(
  userId: string,
  sectionId: string,
  phaseId: string
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}?userId=${userId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("deletePhaseAPI error:", err);
    return false;
  }
}