// // app/progress/[sectionId]/[phaseId]/components/TopicItem.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
// import { useState } from "react";
// import { updateTopicAPI } from "@/lib/server/topics";
// import { toast } from "sonner";
// import Link from "next/link";

// type Props = {
//   topic: {
//     id: string;
//     title: string;
//     description?: string;
//     completed: boolean;
//   };
//   sectionId: string;
//   phaseId: string;
// };

// export function TopicItem({ topic, sectionId, phaseId }: Props) {
//   const [isCompleting, setIsCompleting] = useState(false);

//   const handleToggleComplete = async () => {
//     setIsCompleting(true);
//     try {
//       const success = await updateTopicAPI(sectionId, phaseId, topic.id, {
//         completed: !topic.completed,
//       });

//       if (success) {
//         toast.success(
//           topic.completed ? "Topic reopened" : "Topic marked complete!"
//         );
//       } else {
//         throw new Error("Failed to update");
//       }
//     } catch (err) {
//       toast.error("Update failed");
//     } finally {
//       setIsCompleting(false);
//     }
//   };

//   return (
//     <Card className="group hover:shadow-md transition-shadow">
//       <div className="p-6">
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <CardTitle className="text-lg">{topic.title}</CardTitle>
//             {topic.description && (
//               <CardDescription className="mt-1 line-clamp-2">
//                 {topic.description}
//               </CardDescription>
//             )}
//           </div>

//           <div className="flex gap-2 ml-4">
//             <Button
//               variant={topic.completed ? "secondary" : "default"}
//               size="sm"
//               onClick={handleToggleComplete}
//               disabled={isCompleting}
//             >
//               {topic.completed ? "Completed" : "Mark Complete"}
//             </Button>

//             <Button
//               asChild
//               variant="outline"
//               size="sm"
//               className="opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <Link href={`/progress/${sectionId}/${phaseId}/${topic.id}/edit`}>
//                 Edit
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       <CardFooter className="bg-muted/20 px-6 py-3 text-xs text-muted-foreground border-t">
//         {topic.completed ? (
//           <span className="text-green-600 dark:text-green-400">✅ Completed</span>
//         ) : (
//           <span>In Progress</span>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }