import { NextRequest } from "next/server";
import { createSection } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const { userId, title, description, target } = await req.json();

    if (!userId || !title) {
      return errorResponse("Missing required fields: userId or title", 400);
    }

    const sectionId = await createSection(userId, {
      title,
      description,
      target,
    });

    return successResponse({ sectionId }, "Section created", 201);
  } catch (error) {
    return errorResponse("Failed to create section", 500, error);
  }
}
