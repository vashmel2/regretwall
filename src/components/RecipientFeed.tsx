"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Regret } from "@/types/database";
import RegretCard from "./RegretCard";

type FetchResult = {
  regrets: Regret[];
  nextCursor: string | null;
};

export default function RecipientFeed({
  name,
  initialRegrets,
  initialCursor,
}: {
  name: string;
  initialRegrets: Regret[];
  initialCursor: string | null;
}) {
  const [regrets, setRegrets] = useState<Regret[]>(initialRegrets);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!cursor || loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    setLoadError(false);

    try {
      const res = await fetch(
        `/api/regrets/regrets-for/${encodeURIComponent(name)}?cursor=${encodeURIComponent(cursor)}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data: FetchResult = await res.json();

      setRegrets((prev) => [...prev, ...data.regrets]);
      setCursor(data.nextCursor);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [cursor, name]);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="mt-8">
      <section aria-label={`Anonymous regrets for ${name}`}>
        {regrets.map((regret, i) => (
          <RegretCard key={regret.id} regret={regret} animationIndex={i} />
        ))}
      </section>

      <div ref={observerRef} className="h-1" />

      {isLoading && (
        <div className="py-8 text-center">
          <span className="text-sm text-muted animate-pulse">· · ·</span>
        </div>
      )}

      {loadError && !isLoading && (
        <div className="py-8 text-center">
          <p className="text-sm text-muted/60 mb-2">
            Couldn&apos;t load more regrets.
          </p>
          <button
            onClick={() => loadMore()}
            className="text-sm text-accent hover:underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {!cursor && !loadError && regrets.length > 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted/50">You&apos;ve seen them all.</p>
        </div>
      )}
    </div>
  );
}
