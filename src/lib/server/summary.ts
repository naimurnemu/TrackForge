const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function getSummarySectionByIdAPI(userId: string, sectionId: string) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/summary?userId=${userId}`,
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