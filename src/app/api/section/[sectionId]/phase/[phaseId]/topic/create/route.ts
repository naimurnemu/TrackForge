import { errorResponse, successResponse } from "@/lib/api/response";
import { createTopic } from "@/lib/db/topics";
import { NextRequest } from "next/server";

interface ParamsPromiseType {
  params: Promise<{
    sectionId: string;
    phaseId: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: ParamsPromiseType
) {
  const { sectionId, phaseId } = await params;

  try {
    const { userId, title, description } = await req.json();

    if (!userId || !sectionId || !phaseId) {
      return errorResponse(
        "Missing required fields: userId or sectionId or phaseId",
        400
      );
    }

    const topicId = await createTopic(userId, sectionId, phaseId, {
      title,
      description,
      completed: false,
    });

    return successResponse({ topicId }, "Topic created", 201);
  } catch (error) {
    return errorResponse("Failed to create topic", 500, error);
  }
}
