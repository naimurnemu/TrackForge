import { getQuote } from "@/lib/server/quote";

export default async function HeroQuote() {
  const quote = await getQuote();

  return (
    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
      “{quote?.q}”
      <footer className="mt-2 text-sm text-muted-foreground">
        — {quote?.a}
      </footer>
    </blockquote>
  );
}