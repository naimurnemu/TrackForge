import { Card } from "@/components/ui/card";
import { Clock, BookOpen, CheckCircle } from "lucide-react";

export default function QuickStats() {
  return (
    <div className="space-y-4">
      <StatItem icon={<Clock className="h-5 w-5 text-blue-500" />} label="Today" value="1h 24m" />
      <StatItem icon={<BookOpen className="h-5 w-5 text-green-500" />} label="Topics Completed" value="3" />
      <StatItem icon={<CheckCircle className="h-5 w-5 text-purple-500" />} label="Phases Done" value="1" />
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="flex items-center gap-3 p-3 text-sm">
      {icon}
      <div className="flex-1">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </Card>
  );
}