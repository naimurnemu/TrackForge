// src/lib/server/sections.ts
const API_URL = process.env.NEXT_PUBLIC_APP_URL;

/**
 * Fetch all sections for a user
 */
export async function getUserSectionsAPI(userId: string) {
  try {
    const res = await fetch(`${API_URL}/api/progress/section?userId=${userId}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();
    return data.data?.sections ?? [];
  } catch (err) {
    console.error("getUserSectionsAPI error:", err);
    return [];
  }
}

/**
 * Fetch a single section by ID
 */
export async function getSectionByIdAPI(userId: string, sectionId: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/progress/section/${sectionId}?userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data.data?.section ?? null;
  } catch (err) {
    console.error("getSectionByIdAPI error:", err);
    return null;
  }
}

/**
 * Create a new section
 */
export async function createSectionAPI(payload: {
  userId: string;
  title: string;
  description?: string;
  target?: string;
}) {
  try {
    const res = await fetch(`${API_URL}/api/progress/section/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data.success ? data : null;
  } catch (err) {
    console.error("createSectionAPI error:", err);
    return null;
  }
}

/**
 * Update a section
 */
export async function updateSectionAPI(
  userId: string,
  sectionId: string,
  updates: { title?: string; description?: string; target?: string }
) {
  try {
    const res = await fetch(`${API_URL}/api/progress/section/${sectionId}?userId=${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("updateSectionAPI error:", err);
    return false;
  }
}

/**
 * Delete a section
 */
export async function deleteSectionAPI(userId: string, sectionId: string) {
  try {
    const res = await fetch(`${API_URL}/api/progress/section/${sectionId}?userId=${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("deleteSectionAPI error:", err);
    return false;
  }
}