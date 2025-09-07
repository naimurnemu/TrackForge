import { errorResponse, successResponse } from "@/lib/api/response";
import { getMonthlyProgress } from "@/lib/db/progress";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!userId || !year || !month)
    return errorResponse("Missing userId or year or month", 400);

  try {
    const data = await getMonthlyProgress(userId, Number(year), Number(month));
    return successResponse({ data }, "Progress fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch progress", 500, error);
  }
}
