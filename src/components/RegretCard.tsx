"use client";

import { useState } from "react";
import type { Regret } from "@/types/database";

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

const topicLabels: Record<string, string> = {
  love: "Love",
  career: "Career",
  money: "Money",
  family: "Family",
  health: "Health",
  fear: "Fear",
};

export default function RegretCard({
  regret,
  animationIndex,
}: {
  regret: Regret;
  animationIndex?: number;
}) {
  const [flagged, setFlagged] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const handleFlag = async () => {
    if (flagged) return;
    setFlagged(true);
    try {
      await fetch(`/api/regrets/${regret.id}/flag`, { method: "POST" });
    } catch {
      // Silent fail — don't disrupt UX
    }
  };

  const delayClass =
    animationIndex !== undefined
      ? `animate-delay-${Math.min(animationIndex % 5, 4)}`
      : "";

  return (
    <article
      className={`animate-fade-up ${delayClass} group relative border-b border-border py-6 px-1`}
      onMouseEnter={() => setShowFlag(true)}
      onMouseLeave={() => setShowFlag(false)}
    >
      <blockquote className="m-0 p-0 border-0">
        <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-light">
          {regret.text}
        </p>
      </blockquote>

      <footer className="mt-3 flex items-center gap-3 text-xs text-muted">
        <time dateTime={regret.created_at}>
          {timeAgo(regret.created_at)}
        </time>
        {regret.topic && (
          <>
            <span className="text-border">·</span>
            <span>{topicLabels[regret.topic] ?? regret.topic}</span>
          </>
        )}
        {regret.age_range && (
          <>
            <span className="text-border">·</span>
            <span>{regret.age_range}</span>
          </>
        )}

        <button
          onClick={handleFlag}
          className={`ml-auto text-muted/50 hover:text-muted transition-opacity duration-200 ${
            showFlag || flagged ? "opacity-100" : "opacity-0"
          } ${flagged ? "cursor-default" : "cursor-pointer"}`}
          aria-label="Flag this regret"
          disabled={flagged}
        >
          {flagged ? "flagged" : "flag"}
        </button>
      </footer>
    </article>
  );
}
