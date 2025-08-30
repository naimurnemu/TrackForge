import { NextRequest } from "next/server";
import { getUserSections } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return errorResponse("Missing userId", 400);
    }

    const sections = await getUserSections(userId);
    return successResponse({ sections }, "Fetched sections successfully");
  } catch (err) {
    return errorResponse("Failed to fetch sections", 500, err);
  }
}
