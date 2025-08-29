import HeroQuote from "./components/HeroQuote";
import ProgressGraph from "./components/ProgressGraph";
import QuickStats from "./components/QuickStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-10">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-3xl">Good to see you again!</CardTitle>
            <CardDescription>
              Keep moving forward, one step at a time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HeroQuote />
          </CardContent>
        </Card>
      </section>

      {/* Stats & Graph Grid */}
      <div className="grid gap-6 md:grid-cols-3 justify-between items-stretch">
        {/* Graph */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your learning journey at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressGraph />
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Today’s achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <QuickStats />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}