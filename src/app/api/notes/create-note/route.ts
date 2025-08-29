// src/app/api/notes/create-note/route.ts
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

interface CreateNoteBody {
  sectionId?: string;
  phaseId?: string;
  topicId?: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedClaims = await getAuth().verifySessionCookie(session, true);
    const uid = decodedClaims.uid;

    const body: CreateNoteBody = await req.json();
    const { sectionId, phaseId, topicId, content } = body;

    // At least one parent must be specified
    if (!sectionId && !phaseId && !topicId) {
      return NextResponse.json(
        { error: "Must specify section, phase, or topic" },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    const noteData = {
      sectionId,
      phaseId,
      topicId,
      content: content.trim(),
      userId: uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "notes"), noteData);

    return NextResponse.json(
      { id: docRef.id, ...noteData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}