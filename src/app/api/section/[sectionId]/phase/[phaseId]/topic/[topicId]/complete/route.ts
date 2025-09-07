import { errorResponse, successResponse } from "@/lib/api/response";
import { updateProgress } from "@/lib/db/progress";
import { completeTopic } from "@/lib/db/topics";
import { NextRequest } from "next/server";

interface ParamsPromiseType {
  params: Promise<{
    sectionId: string;
    phaseId: string;
    topicId: string;
  }>;
}

export async function PATCH(req: NextRequest, { params }: ParamsPromiseType) {
  const { sectionId, phaseId, topicId } = await params;

  if (!sectionId || !phaseId || !topicId)
    return errorResponse("Missing sectionId or phaseId or topicId", 400);

  try {
    const { summary, timeSpentMinutes, userId } = await req.json();

    await completeTopic(
      userId,
      sectionId,
      phaseId,
      topicId,
      summary,
      timeSpentMinutes
    );

    await updateProgress(userId, phaseId, timeSpentMinutes);

    return successResponse({}, "Topic completed", 200);
  } catch (error) {
    return errorResponse("Failed to complete topic", 500, error);
  }
}
