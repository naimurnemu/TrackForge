import { NextRequest } from "next/server";
import { getUserSections } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return errorResponse("Missing userId", 400);

  try {
    const sections = await getUserSections(userId);
    return successResponse({ sections }, "Sections fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch sections", 500, error);
  }
}

