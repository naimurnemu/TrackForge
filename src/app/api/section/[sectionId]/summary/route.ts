import { errorResponse, successResponse } from "@/lib/api/response";
import { getFullSectionTree } from "@/lib/db/summary";
import { NextRequest } from "next/server";

interface ParamsPromiseType {
  params: Promise<{
    sectionId: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: ParamsPromiseType
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { sectionId } = await params;

  if (!userId || !sectionId)
    return errorResponse("Missing userId or sectionId", 400);

  try {
    const section = await getFullSectionTree(userId, sectionId);
    console.log("section:", section);
    if (!section) return errorResponse("Section not found", 404);
    return successResponse({ section }, "Section fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch section", 500, error);
  }
}