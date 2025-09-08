import { Card } from "@/components/ui/card";
import { getDailyProgress } from "@/lib/server/progress";
import { Progress } from "@/types";
import { Clock, BookOpen, CheckCircle } from "lucide-react";

interface QuickStatsProps { 
  userId: string;
}

export default async function QuickStats({ userId }: QuickStatsProps) {

  let progress: Progress = await getDailyProgress(userId);

  if (!progress) 
    progress = {
      date: new Date().toISOString().split("T")[0],
      totalTimeSpent: 0,
      totalCompletedTopic: 0,
      interactedPhases: []
    }

  const { date, totalTimeSpent, totalCompletedTopic, interactedPhases } = progress;

  const time = `${Math.floor((totalTimeSpent || 1)/ 60)} h ${Math.round((totalTimeSpent || 0) % 60)} min`;


  return (
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 items-stretch">
      <StatItem icon={<Clock className="h-5 w-5 text-blue-500" />} label={date} date={date} value={time} />
      <StatItem icon={<BookOpen className="h-5 w-5 text-green-500" />} label="Topics Completed" value={totalCompletedTopic || 0} />
      <StatItem icon={<CheckCircle className="h-5 w-5 text-purple-500" />} label="Phases Interacted" value={interactedPhases?.length || 0} />
    </div>
  );
}

function StatItem({ icon, label, date, value }: { icon: React.ReactNode; date?: string; label: string; value: string | number }) {
  return (
    <Card className="flex items-center gap-3 p-3 h-full text-sm">
      {icon}
      <div className="flex-1 text-center">
        <p className="text-muted-foreground ">{label} {date && "(Today)"}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </Card>
  );
}