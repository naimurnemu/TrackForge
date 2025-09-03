import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getPhasesBySection } from "@/lib/db/phases";

export async function GET(req: NextRequest, { params }: { params: { sectionId: string } }) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = params.sectionId;
  if (!userId || !sectionId)
    return errorResponse("Missing userId or sectionId", 400);

  try {
    const phases = await getPhasesBySection(userId, sectionId);
    return successResponse({ phases }, "Phases fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch phases", 500, error);
  }
}
