"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Regret } from "@/types/database";
import RegretCard from "./RegretCard";
import SubmitForm from "./SubmitForm";

type FetchResult = {
  regrets: Regret[];
  nextCursor: string | null;
};

const SCROLL_THRESHOLD_FOR_FORM = 600; // px scrolled before showing form

export default function RegretFeed({
  initialRegrets,
  initialCursor,
}: {
  initialRegrets: Regret[];
  initialCursor: string | null;
}) {
  const [regrets, setRegrets] = useState<Regret[]>(initialRegrets);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  // Show submission form after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_FOR_FORM) {
        setShowForm(true);
      }
    };

    // Also show after 15 seconds on page
    const timer = setTimeout(() => setShowForm(true), 15000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (!cursor || loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/regrets?cursor=${encodeURIComponent(cursor)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: FetchResult = await res.json();

      setRegrets((prev) => [...prev, ...data.regrets]);
      setCursor(data.nextCursor);
    } catch {
      // Silent fail — user can scroll again to retry
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [cursor]);

  // Intersection Observer for infinite scroll
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

  const handleNewRegret = (regret: Regret) => {
    setRegrets((prev) => [regret, ...prev]);
  };

  return (
    <div>
      {/* Submission form — fades in after scroll/time */}
      <div
        className={`transition-all duration-700 ${
          showForm
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <SubmitForm onSubmitted={handleNewRegret} />
      </div>

      {/* The feed */}
      <section id="recent-regrets" aria-label="Recent anonymous regrets">
        {regrets.map((regret, i) => (
          <RegretCard key={regret.id} regret={regret} animationIndex={i} />
        ))}
      </section>

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-1" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="py-8 text-center">
          <span className="text-sm text-muted animate-pulse">· · ·</span>
        </div>
      )}

      {/* End of feed */}
      {!cursor && regrets.length > 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted/50">You&apos;ve reached the end.</p>
        </div>
      )}

      {/* Empty state */}
      {regrets.length === 0 && !isLoading && (
        <div className="py-20 text-center">
          <p className="text-muted">No regrets yet. Be the first.</p>
        </div>
      )}
    </div>
  );
}
