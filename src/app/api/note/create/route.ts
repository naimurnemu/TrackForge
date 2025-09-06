// src/app/api/notes/create-note/route.ts
import { errorResponse, successResponse } from "@/lib/api/response";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface CreateNoteBody {
  sectionId?: string;
  phaseId?: string;
  topicId?: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { sectionId, phaseId, topicId, content } = (await req.json()) as CreateNoteBody;

    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId && !sectionId && !phaseId && !topicId) {
      return errorResponse("Must specify user, section, phase, or topic" , 400);
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    const noteData = {
      userId,
      sectionId,
      phaseId,
      topicId,

      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "notes"), noteData);

    return successResponse({ id: docRef.id, ...noteData }, "Note created", 201);
  } catch (error) {
    return errorResponse("Failed to create note", 500, error);
  }
}