"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Regret } from "@/types/database";
import RegretCard from "./RegretCard";
import SubmitForm from "./SubmitForm";

type Sort = "recent" | "top";

export default function RegretFeed({
  initialRegrets,
  initialCursor,
  dbAvailable = true,
}: {
  initialRegrets: Regret[];
  initialCursor: string | null;
  dbAvailable?: boolean;
}) {
  const [sort, setSort] = useState<Sort>("recent");

  // Recent sort state (cursor-based, infinite scroll)
  const [recentRegrets, setRecentRegrets] = useState<Regret[]>(initialRegrets);
  const [cursor, setCursor] = useState<string | null>(initialCursor);

  // Top sort state (loaded once on first tab switch)
  const [topRegrets, setTopRegrets] = useState<Regret[]>([]);
  const [topLoaded, setTopLoaded] = useState(false);
  const [topLoading, setTopLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const loadMoreRecent = useCallback(async () => {
    if (!cursor || loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(`/api/regrets?cursor=${encodeURIComponent(cursor)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRecentRegrets((prev) => [...prev, ...data.regrets]);
      setCursor(data.nextCursor);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [cursor]);

  // Load top regrets on first switch to that tab
  useEffect(() => {
    if (sort !== "top" || topLoaded) return;
    setTopLoading(true);
    setTopLoaded(true);
    fetch("/api/regrets?sort=top")
      .then((r) => r.json())
      .then((data) => setTopRegrets(data.regrets ?? []))
      .catch(() => setLoadError(true))
      .finally(() => setTopLoading(false));
  }, [sort, topLoaded]);

  // Infinite scroll — only active for "recent"
  useEffect(() => {
    if (sort !== "recent") return;
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMoreRecent(); },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sort, loadMoreRecent]);

  const handleNewRegret = (regret: Regret) => {
    setRecentRegrets((prev) => [regret, ...prev]);
    // Invalidate top cache so it reloads with the new regret included
    setTopLoaded(false);
    setTopRegrets([]);
  };

  const handleSortChange = (newSort: Sort) => {
    if (newSort === sort) return;
    setLoadError(false);
    setSort(newSort);
  };

  const regrets = sort === "recent" ? recentRegrets : topRegrets;
  const loading = sort === "recent" ? isLoading : topLoading;
  const hasMoreRecent = !!cursor;

  return (
    <div>
      <SubmitForm onSubmitted={handleNewRegret} />

      {/* Sort toggle */}
      <div className="flex items-center gap-5 py-4 border-b border-border/30 mb-1">
        <button
          onClick={() => handleSortChange("recent")}
          className={`text-sm transition-colors cursor-pointer ${
            sort === "recent" ? "text-foreground" : "text-muted/50 hover:text-muted"
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => handleSortChange("top")}
          className={`text-sm transition-colors cursor-pointer ${
            sort === "top" ? "text-foreground" : "text-muted/50 hover:text-muted"
          }`}
        >
          Most felt
        </button>
      </div>

      <section id="recent-regrets" aria-label="Anonymous regrets">
        {regrets.map((regret, i) => (
          <RegretCard key={regret.id} regret={regret} animationIndex={i} />
        ))}
      </section>

      {/* Infinite scroll trigger (recent only) */}
      {sort === "recent" && <div ref={observerRef} className="h-1" />}

      {loading && (
        <div className="py-8 text-center">
          <span className="text-sm text-muted animate-pulse">· · ·</span>
        </div>
      )}

      {loadError && !loading && (
        <div className="py-8 text-center">
          <p className="text-sm text-muted/60 mb-2">Couldn&apos;t load regrets.</p>
          <button
            onClick={() => sort === "recent" ? loadMoreRecent() : (setTopLoaded(false), setSort("top"))}
            className="text-sm text-accent hover:underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {sort === "recent" && !hasMoreRecent && !loadError && recentRegrets.length > 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted/50">You&apos;ve reached the end.</p>
        </div>
      )}

      {sort === "top" && !topLoading && topRegrets.length > 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted/50">
            {topRegrets.length} {topRegrets.length === 1 ? "regret" : "regrets"} by resonance.
          </p>
        </div>
      )}

      {regrets.length === 0 && !loading && (
        <div className="py-20 text-center">
          <p className="text-muted">
            {dbAvailable
              ? sort === "top" ? "No regrets with resonance yet." : "No regrets yet. Be the first."
              : "Unable to load regrets right now. Check back soon."}
          </p>
        </div>
      )}
    </div>
  );
}
