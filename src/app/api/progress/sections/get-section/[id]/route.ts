import { NextRequest } from "next/server";
import { getSectionById } from "@/lib/db/sections";
import { successResponse, errorResponse } from "@/lib/api/response";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const section = await getSectionById(params.id);

    if (!section) {
      return errorResponse("Section not found", 404);
    }

    return successResponse({ section }, "Fetched section successfully");
  } catch (err) {
    return errorResponse("Failed to fetch section", 500, err);
  }
}
