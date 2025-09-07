import { errorResponse, successResponse } from "@/lib/api/response";
import { getDailyProgress } from "@/lib/db/progress";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const day = searchParams.get("day");

  if (!userId || !day) return errorResponse("Missing userId", 400);

  try {
    const progress = await getDailyProgress(userId, day);
    return successResponse({ progress }, "Progress fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch progress", 500, error);
  }
}
