import { errorResponse, successResponse } from "@/lib/api/response";
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
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId, phaseId, topicId } = await params;

  if (!userId || !sectionId || !phaseId || !topicId)
    return errorResponse(
      "Missing userId or sectionId or phaseId or topicId",
      400
    );

  try {
    const { summary, timeSpentMinutes } = await req.json();

    await completeTopic(
      userId,
      sectionId,
      phaseId,
      topicId,
      summary,
      timeSpentMinutes
    );
    return successResponse({}, "Topic completed", 200);
  } catch (error) {
    return errorResponse("Failed to complete topic", 500, error);
  }
}
