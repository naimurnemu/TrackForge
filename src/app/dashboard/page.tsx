import { Button } from "@/components/ui/button";
import HeroQuote from "./components/HeroQuote";
import ProgressGraph from "./components/ProgressGraph";
import QuickStats from "./components/QuickStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/server/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-3xl">Good to see you again!</CardTitle>
            <CardDescription>
              Keep moving forward, one step at a time.
            </CardDescription>
          </CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-4">
            <CardContent>
              <HeroQuote />
            </CardContent>
            <div className="w-full lg:max-w-48 text-end px-6 self-end">
              <Button asChild>
                <Link href="/progress">Open Progress</Link>
              </Button>
            </div>
          </div>

        </Card>
      </section>

      <div className="grid gap-6 grid-cols-3 justify-between items-stretch w-full">
        <div className="col-span-3 lg:col-span-2 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your learning journey at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressGraph userId={user.uid} />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 lg:col-span-1 w-full ">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Today’s achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <QuickStats userId={user.uid} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}