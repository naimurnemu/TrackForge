import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getPhaseProgress, getPhasesBySection } from "@/lib/db/phases";

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
    let phases = await getPhasesBySection(userId, sectionId);

    if (phases.length > 0) {
      phases = await Promise.all(
        phases.map(async (phase) => {
          const progress = await getPhaseProgress(userId, sectionId, phase.id);
          return {
            ...phase,
            progress,
          };
        })
      );
    }

    return successResponse({ phases }, "Phases fetched", 200);
  } catch (error) {
    return errorResponse("Failed to fetch phases", 500, error);
  }
}
