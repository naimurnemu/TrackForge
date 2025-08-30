import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, ListVideo, AlertCircle } from "lucide-react";

import { getSectionByIdAPI } from "@/lib/server/progress"; // Adjust path as needed
import { Section, Phase } from "@/types";

export default async function SectionDetailPage({ params }: { params: { sectionId: string } }) {
  const { sectionId } = params;

  let section: Section | null = null;
  let error: string | null = null;

  try {
    section = await getSectionByIdAPI(sectionId);
    if (!section) {
      error = "Section not found or access denied.";
    }
  } catch (err: any) {
    console.error("Error fetching section server-side:", err);
    error = err.message || "Failed to load section.";
  }

  // Pass initial data and error to client component
  return (
    <ClientSectionDetail section={section} sectionId={sectionId} initialError={error} />
  );
}