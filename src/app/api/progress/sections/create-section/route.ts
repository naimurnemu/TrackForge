import { NextRequest } from "next/server";
import { createSection } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const { title, description, target, userId } = await req.json();

    if (!title || !userId) {
      return errorResponse("Missing required fields", 400);
    }

    const sectionId = await createSection({
      title,
      description,
      target,
      userId,
    });

    return successResponse({ sectionId }, "Section created successfully", 201);
  } catch (err) {
    return errorResponse("Failed to create section", 500, err);
  }
}

