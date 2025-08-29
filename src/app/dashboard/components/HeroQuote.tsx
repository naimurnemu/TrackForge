"use client";

import { useEffect, useState } from "react";

interface Quote {
  content: string;
  author: string;
}

export default function HeroQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        setQuote(data);
      } catch (error) {
        setQuote({ content: "Keep going. You're getting closer.", author: "Unknown" });
        console.error("Error fetching quote:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading inspiration...</p>;
  }

  return (
    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
      “{quote?.content}”
      <footer className="mt-2 text-sm text-muted-foreground">
        — {quote?.author}
      </footer>
    </blockquote>
  );
}