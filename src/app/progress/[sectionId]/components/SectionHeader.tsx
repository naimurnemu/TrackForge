// import { Card, CardDescription, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// type Props = {
//   title: string;
//   description?: string;
//   target?: string;
//   createdAt: Date | string | number;
//   progress?: number; 
// };

// export function SectionHeader({
//   title,
//   description,
//   target,
//   createdAt,
//   progress = 0,
// }: Props) {
//   const date = new Date(createdAt).toLocaleDateString();

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap items-start justify-between gap-4">
//         <div className="flex-1 min-w-0">
//           <CardTitle className="text-3xl">{title}</CardTitle>
//           <CardDescription className="mt-1">Created on {date}</CardDescription>
//         </div>
//         <Badge variant="secondary" className="shrink-0">
//           {progress}% Complete
//         </Badge>
//       </div>

//       {description && (
//         <p className="text-foreground leading-relaxed">{description}</p>
//       )}

//       {target && (
//         <p className="text-sm">
//           <span className="text-muted-foreground">🎯 Target: </span>
//           {target}
//         </p>
//       )}
//     </div>
//   );
// }