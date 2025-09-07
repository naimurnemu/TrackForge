const API_BASE = process.env.NEXT_PUBLIC_APP_URL;

export async function getDailyProgress(userId: string, day: string) {
  try {
    const res = await fetch(`${API_BASE}/progress?userId=${userId}&day=${day}`);
    
    const data = await res.json();
    return data.data?.progress ?? null;
  } catch (err) {
    console.error("getDailyProgress error:", err);
    return null;
  }
}

export async function getMonthlyProgress(
  userId: string,
  year: number,
  month: number
) {
  try {
    const res = await fetch(
      `${API_BASE}/progress?userId=${userId}&year=${year}&month=${month}`
    );
    const data = await res.json();
    return data.data?.progress ?? null;
  } catch (err) {
    console.error("getMonthlyProgress error:", err);
    return null;
  }
}