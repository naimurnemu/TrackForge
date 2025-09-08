const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function getDailyProgress(userId: string) {
  try {
    const res = await fetch(`${API_URL}/progress/day?userId=${userId}`);
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
      `${API_URL}/progress/month?userId=${userId}&year=${year}&month=${month}`
    );
    const data = await res.json();
    console.log("getMonthlyProgress data:", data);
    return data.data?.data ?? null;

  } catch (err) {
    console.error("getMonthlyProgress error:", err);
    return null;
  }
}