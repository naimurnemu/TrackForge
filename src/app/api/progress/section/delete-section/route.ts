import { NextRequest } from "next/server";
import { deleteSection } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

export async function DELETE(req: NextRequest) {
  try {
    const { sectionId } = await req.json();

    if (!sectionId) {
      return errorResponse("Missing sectionId", 400);
    }

    await deleteSection(sectionId);
    return successResponse({}, "Section deleted successfully");
  } catch (err) {
    return errorResponse("Failed to delete section", 500, err);
  }
}
