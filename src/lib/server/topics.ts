const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function getTopicsByPhaseIdAPI(
  userId: string,
  sectionId: string,
  phaseId: string
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}/topic?userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data.data?.topic ?? [];
  } catch (err) {
    console.error("getTopicsByPhaseIdAPI error:", err);
    return [];
  }
}

export async function getTopicByIdAPI(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}/topic/${topicId}?userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    const data = await res.json();
    console.log("getTopicsByPhaseIdAPI data:", data);
    return data.data?.topic ?? null;
  } catch (err) {
    console.error("getTopicByIdAPI error:", err);
    return null;
  }
}

export async function createTopicAPI(payload: {
  userId: string;
  sectionId: string;
  phaseId: string;
  title: string;
  description?: string;
}) {
  try {
    const { userId, sectionId, phaseId, ...body } = payload;

    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}/topic/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...body }),
      }
    );

    const data = await res.json();
    return data.success ? data : null;
  } catch (err) {
    console.error("createTopicAPI error:", err);
    return null;
  }
}

export async function updateTopicAPI(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string,
  updates: {
    title?: string;
    description?: string;
  }
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}/topic/${topicId}?userId=${userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("updateTopicAPI error:", err);
    return false;
  }
}

export async function completeTopicAPI(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string,
  summary: string,
  timeSpentMinutes: number
) {
  console.log("completeTopicAPI called", userId, sectionId, phaseId, topicId, summary, timeSpentMinutes);
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}/topic/${topicId}/complete`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, summary, timeSpentMinutes }),
      }
    );

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("completeTopicAPI error:", err);
    return false;
  }
}

export async function deleteTopicAPI(
  userId: string,
  sectionId: string,
  phaseId: string,
  topicId: string
) {
  try {
    const res = await fetch(
      `${API_URL}/section/${sectionId}/phase/${phaseId}/topic/${topicId}?userId=${userId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("deleteTopicAPI error:", err);
    return false;
  }
}
