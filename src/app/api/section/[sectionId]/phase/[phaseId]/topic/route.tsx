import { errorResponse, successResponse } from "@/lib/api/response";
import { getTopicsByPhase } from "@/lib/db/topics";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = searchParams.get("sectionId");
  const phaseId = searchParams.get("phaseId");

  if (!userId || !sectionId || !phaseId)
    return errorResponse("Missing userId or sectionId or phaseId or topicId", 400);

  try {
    const topic = await getTopicsByPhase(userId, sectionId, phaseId);
    if (!topic) return errorResponse("Topic not found", 404);
    return successResponse({ topic }, "Topic fetched", 200);
  }catch (error) {
    return errorResponse("Failed to fetch topic", 500, error);
  }
  
}