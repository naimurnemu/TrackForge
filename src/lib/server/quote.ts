import { Quote } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function getQuote(): Promise<Quote> {
  try {
    const res = await fetch(
      `${API_URL}/quote`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { q: "Keep going. You're getting closer.", a: "Unknown" };
  }
}
