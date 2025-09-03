import { errorResponse, successResponse } from "@/lib/api/response";
import { deletePhase, getPhaseById, updatePhase } from "@/lib/db/phases";
import { Phase } from "@/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = searchParams.get("sectionId");
  const phaseId = params.id;

  if (!userId || !sectionId || !phaseId)
    return errorResponse("Missing userId or sectionId or phaseId", 400);

  try {
    const phase = await getPhaseById(userId, sectionId, phaseId);
    if (!phase) return errorResponse("Phase not found", 404);
    return successResponse({ phase }, "Phase fetched", 200);
  }catch (error) {
    return errorResponse("Failed to fetch phase", 500, error);
  }
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = searchParams.get("sectionId");
  const phaseId = searchParams.get("phaseId");

  if (!userId || !sectionId || !phaseId)
    return errorResponse("Missing userId or sectionId or phaseId", 400);

  try {
    const { title, description, type, completed, progress } = await req.json();

    const updates: Partial<Phase> = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (type) updates.type = type;
    if (completed !== undefined) updates.completed = completed;
    if (progress !== undefined) updates.progress = progress;

    await updatePhase(userId, sectionId, phaseId, updates);

    return successResponse({}, "Phase updated", 200);
  } catch (error) {
    return errorResponse("Failed to update phase", 500, error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const sectionId = searchParams.get("sectionId");
  const phaseId = params.id;

  if (!userId || !sectionId || !phaseId)
    return errorResponse("Missing userId or sectionId or phaseId", 400);

  try {
    await deletePhase(userId, sectionId, phaseId);
    return successResponse({}, "Phase deleted", 200);
  } catch (error) {
    return errorResponse("Failed to delete phase", 500, error);
  }
}
