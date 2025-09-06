"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import { Button } from "@/components/ui/button";
import { getPhasesBySectionIdAPI } from "@/lib/server/phases";

interface NoteAccordionProps {
  userId: string;
  sectionId: string;
}

export default function NoteAccordion({ sectionId, userId }: NoteAccordionProps) {
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhases() {
      setLoading(true);
      try {
        const res = await getPhasesBySectionIdAPI(userId, sectionId);
        const data = await res.json();
        setPhases(data || []);
      } catch (e) {
        console.error("Failed to fetch phases", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPhases();
  }, [sectionId]);

  const handleSave = (topicId: string, content: string) => {
    setNotes((prev) => ({ ...prev, [topicId]: content }));
    // TODO: call API to persist note
    setActiveTopic(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (phases.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-20">
        No phases found for this section.
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {phases.map((phase) => (
        <AccordionItem key={phase.id} value={phase.id}>
          <AccordionTrigger className="text-lg font-semibold">
            {phase.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            {phase.topics?.map((topic: any) => (
              <div key={topic.id} className="border rounded-md p-4">
                <h3 className="font-medium mb-2">{topic.title}</h3>

                {activeTopic === topic.id ? (
                  <NoteEditor
                    initialValue={notes[topic.id] || ""}
                    onSave={(val) => handleSave(topic.id, val)}
                    onCancel={() => setActiveTopic(null)}
                  />
                ) : notes[topic.id] ? (
                  <NoteViewer
                    content={notes[topic.id]}
                    onEdit={() => setActiveTopic(topic.id)}
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTopic(topic.id)}
                  >
                    Add note
                  </Button>
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// app/note/[sectionId]/components/NoteAccordion.tsx
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import NoteEditor from "./NoteEditor";
// import NoteViewer from "./NoteViewer";

// export default function NoteAccordion({ sectionId }: { sectionId: string }) {
//   const [phases, setPhases] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [notes, setNotes] = useState<Record<string, string>>({});
//   const [activeTopic, setActiveTopic] = useState<string | null>(null);

//   // 🔹 Fake dataset
//   const fakePhases = [
//     {
//       id: "phase1",
//       title: "Learn Basics",
//       topics: [
//         { id: "topic1", title: "Intro to React" },
//         { id: "topic2", title: "Components and Props" },
//       ],
//     },
//     {
//       id: "phase2",
//       title: "Practice",
//       topics: [
//         { id: "topic3", title: "Build a Counter App" },
//         { id: "topic4", title: "Todo List Project" },
//       ],
//     },
//     {
//       id: "phase3",
//       title: "Project",
//       topics: [
//         { id: "topic5", title: "Final Portfolio Project" },
//       ],
//     },
//   ];

//   useEffect(() => {
//     // Simulate API delay
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setPhases(fakePhases);
//       setLoading(false);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [sectionId]);

//   const handleSave = (topicId: string, content: string) => {
//     setNotes((prev) => ({ ...prev, [topicId]: content }));
//     setActiveTopic(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   return (
//     <Accordion type="single" collapsible className="space-y-4">
//       {phases.map((phase) => (
//         <AccordionItem key={phase.id} value={phase.id}>
//           <AccordionTrigger className="text-lg font-semibold">
//             {phase.title}
//           </AccordionTrigger>
//           <AccordionContent className="space-y-4">
//             {phase.topics.map((topic: any) => (
//               <div key={topic.id} className="border rounded-md p-4">
//                 <h3 className="font-medium mb-2">{topic.title}</h3>

//                 {activeTopic === topic.id ? (
//                   <NoteEditor
//                     initialValue={notes[topic.id] || ""}
//                     onSave={(val) => handleSave(topic.id, val)}
//                     onCancel={() => setActiveTopic(null)}
//                   />
//                 ) : notes[topic.id] ? (
//                   <NoteViewer
//                     content={notes[topic.id]}
//                     onEdit={() => setActiveTopic(topic.id)}
//                   />
//                 ) : (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setActiveTopic(topic.id)}
//                   >
//                     Add note
//                   </Button>
//                 )}
//               </div>
//             ))}
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }

