import { NextRequest } from "next/server";
import { updateSection } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

export async function PUT(req: NextRequest) {
  try {
    const { sectionId, updates } = await req.json();

    if (!sectionId || !updates) {
      return errorResponse("Missing sectionId or updates", 400);
    }

    await updateSection(sectionId, updates);
    return successResponse({}, "Section updated successfully");
  } catch (err) {
    return errorResponse("Failed to update section", 500, err);
  }
}
