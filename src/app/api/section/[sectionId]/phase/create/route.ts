import { errorResponse, successResponse } from "@/lib/api/response";
import { CreatePhase } from "@/lib/db/phases";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { userId, sectionId, title, description, type } = await req.json();

    if (!userId || !sectionId) {
      return errorResponse("Missing required fields: userId or sectionId", 400);
    }

    const phaseId = await CreatePhase(userId, sectionId, {
      title,
      description,
      type: type || "Learn", 
      completed: false,
      progress: 0,
    });
  
    return successResponse({ phaseId }, "Phase created", 201);
  } catch (error) {
    return errorResponse("Failed to create phase", 500, error);
  }
  
}