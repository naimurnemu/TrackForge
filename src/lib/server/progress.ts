const API_URL = process.env.NEXT_PUBLIC_APP_URL

export async function getUserSectionsAPI(userId: string) {
  const res = await fetch(`${API_URL}/api/progress/sections/get-sections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sections");
  }

  const json = await res.json();
  return json.data?.sections ?? [];
}

export async function getSectionByIdAPI(sectionId: string) {
  const res = await fetch(`${API_URL}/api/progress/sections/get-section/${sectionId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch section");
  }

  const json = await res.json();
  return json.data?.section ?? null;
}

export async function createSectionAPI(payload: {
  userId: string;
  title: string;
  description?: string;
  target?: string;
}) {
  const res = await fetch(`${API_URL}/api/progress/sections/create-section`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create section");
  }

  const json = await res.json();
  return json;
}

export async function updateSectionAPI(sectionId: string, updates: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/api/progress/sections/update-section`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sectionId, updates }),
  });

  if (!res.ok) {
    throw new Error("Failed to update section");
  }

  return true;
}

export async function deleteSectionAPI(sectionId: string) {
  const res = await fetch(`${API_URL}/api/progress/sections/delete-section`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sectionId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete section");
  }

  return true;
}
