import { errorResponse, successResponse } from "@/lib/api/response";
import {
  deleteSection,
  getSectionById,
  updateSection,
} from "@/lib/db/sections";
import { NextRequest } from "next/server";

interface ParamsPromiseType {
  params: Promise<{
    sectionId: string;
  }>;
}

export async function GET(req: NextRequest, { params }: ParamsPromiseType) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId } = await params;

  if (!userId || !sectionId)
    return errorResponse("Missing userId or sectionId", 400);

  try {
    const section = await getSectionById(userId, sectionId);
    if (!section) return errorResponse("Section not found", 404);
    return successResponse({ section }, "Section fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch section", 500, error);
  }
}

export async function PUT(req: NextRequest, { params }: ParamsPromiseType) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId } = await params;

  if (!userId || !sectionId)
    return errorResponse("Missing userId or sectionId", 400);

  try {
    const { title, description, target } = await req.json();

    const updates: { title?: string; description?: string; target?: string } =
      {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (target) updates.target = target;

    await updateSection(userId, sectionId, updates);

    return successResponse({}, "Section updated", 200);
  } catch (error) {
    return errorResponse("Failed to update section", 500, error);
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsPromiseType) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId } = await params;

  if (!userId || !sectionId)
    return errorResponse("Missing userId or sectionId", 400);

  try {
    await deleteSection(userId, sectionId);
    return successResponse({}, "Section deleted", 200);
  } catch (error) {
    return errorResponse("Failed to delete section", 500, error);
  }
}
