import { errorResponse, successResponse } from "@/lib/api/response";
import { deleteTopic, getTopicById, updateTopic } from "@/lib/db/topics";
import { Topic } from "@/types";
import { NextRequest } from "next/server";

interface ParamsPromiseType {
  params: Promise<{
    sectionId: string;
    phaseId: string;
    topicId: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: ParamsPromiseType
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId, phaseId, topicId } = await params;

  if (!userId || !sectionId || !phaseId || !topicId)
    return errorResponse(
      "Missing userId or sectionId or phaseId or topicId",
      400
    );

  try {
    const topic = await getTopicById(userId, sectionId, phaseId, topicId);
    if (!topic) return errorResponse("Topic not found", 404);
    return successResponse({ topic }, "Topic fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch topic", 500, error);
  }
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
    const { title, description, completed } = await req.json();

    const updates: Partial<Topic> = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    await updateTopic(userId, sectionId, phaseId, topicId, updates);
    return successResponse({}, "Topic updated", 200);
  } catch (error) {
    return errorResponse("Failed to update topic", 500, error);
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: ParamsPromiseType
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId, phaseId, topicId } = await params;

  if (!userId || !sectionId || !phaseId || !topicId)
    return errorResponse(
      "Missing userId or sectionId or phaseId or topicId",
      400
    );

  try {
    await deleteTopic(userId, sectionId, phaseId, topicId);
    return successResponse({}, "Topic deleted", 200);
  } catch (error) {
    return errorResponse("Failed to delete topic", 500, error);
  }
}
