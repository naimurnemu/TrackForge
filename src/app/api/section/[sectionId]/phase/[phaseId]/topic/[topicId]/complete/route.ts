import { errorResponse, successResponse } from "@/lib/api/response";
import { completeTopic } from "@/lib/db/topics";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = searchParams.get("sectionId");
  const phaseId = searchParams.get("phaseId");
  const topicId = searchParams.get("topicId");

  if (!userId || !sectionId || !phaseId || !topicId)
    return errorResponse(
      "Missing userId or sectionId or phaseId or topicId",
      400
    );

  try {
    const { summary, timeSpentMinutes } = await req.json();

    await completeTopic(userId, sectionId, phaseId, topicId, summary, timeSpentMinutes);
    return successResponse({}, "Topic completed", 200);
  } catch (error) {
    return errorResponse("Failed to complete topic", 500, error);
  }
  
}