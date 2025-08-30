import { NextRequest } from "next/server";
import { createSection } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const { title, description, target, userId } = await req.json();

    console.log("Received data:", {
      title,
      description,
      target,
      userId,
    });

    if (!title || !userId) {
      return errorResponse("Missing required fields", 400);
    }

    console.log("Creating section...");
    const sectionId = await createSection({
      title,
      description,
      target,
      userId,
    });
    console.log("Section created:", sectionId);

    return successResponse({ sectionId }, "Section created successfully", 201);
  } catch (err) {
    console.error("Error creating section:", err);
    return errorResponse("Failed to create section", 500, err);
  }
}
