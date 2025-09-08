"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { getMonthlyProgress } from "@/lib/server/progress";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

interface Progress {
  date: string;
  totalTimeSpent?: number;
  totalCompletedTopic?: number;
  interactedPhases?: string[];
}

export default function ProgressGraph({ userId }: { userId: string }) {
  const { theme } = useTheme();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [progress, setProgress] = useState<Progress[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const data = await getMonthlyProgress(userId, year, month);
      setProgress(data ?? null);
    } catch (err) {
      console.error("Error fetching progress:", err);
      setProgress(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [year, month]);

  const labels = progress?.map((p) => new Date(p.date).getDate().toString()) ?? [];
  const timeSpentData = progress?.map((p) => (p?.totalTimeSpent ?? 0) / 60) ?? [];
  const topicsData = progress?.map((p) => p.totalCompletedTopic ?? 0) ?? [];
  const phasesData = progress?.map((p) => p.interactedPhases?.length ?? 0) ?? [];

  const isDark = theme === "dark";

  const chartData = {
    labels,
    datasets: [
      {
        label: "Time (hrs)",
        data: timeSpentData,
        borderColor: "rgba(34,197,94,1)", // green
        backgroundColor: "rgba(34,197,94,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(34,197,94,1)",
        pointHoverBackgroundColor: "rgba(34,197,94,1)",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Topics",
        data: topicsData,
        borderColor: "rgba(59,130,246,1)", // blue
        backgroundColor: "rgba(59,130,246,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(59,130,246,1)",
      },
      {
        label: "Phases",
        data: phasesData,
        borderColor: "rgba(234,179,8,1)", // yellow
        backgroundColor: "rgba(234,179,8,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(234,179,8,1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
          usepointStyle: true,
          pointStyle: "circle",
          boxWidth: 15,
          boxHeight: 15,

        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: isDark ? "#1f2937" : "#f9fafb",
        titleColor: isDark ? "#f9fafb" : "#111827",
        bodyColor: isDark ? "#f9fafb" : "#111827",
        borderWidth: 0,
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#d1d5db" : "#374151" },
        grid: { color: isDark ? "rgba(75,85,99,0.3)" : "rgba(229,231,235,0.4)" },
      },
      y: {
        beginAtZero: true,
        suggestedMax:
          Math.max(...timeSpentData, ...topicsData, ...phasesData) * 1.4 || 5,
        ticks: { color: isDark ? "#d1d5db" : "#374151" },
        grid: { color: isDark ? "rgba(75,85,99,0.3)" : "rgba(229,231,235,0.4)" },
      },
    },
  };

  const yearOptions = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i);

  const monthOptions =
    year === now.getFullYear()
      ? Array.from({ length: now.getMonth() + 1 }, (_, i) => i + 1)
      : Array.from({ length: 12 }, (_, i) => i + 1);



  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Select value={year.toString()} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={month.toString()} onValueChange={(v) => setMonth(Number(v))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {new Date(2000, m - 1).toLocaleString("default", { month: "long" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-[360px] flex items-center justify-center">
          {loading ? (
            <p className="text-muted-foreground animate-pulse">Fetching progress...</p>
          ) : !progress || progress.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p className="mb-1">No progress data found</p>
              <p className="text-xs">Try selecting a different month or year.</p>
            </div>
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
