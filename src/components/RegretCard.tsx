"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  linkable = true,
}: {
  regret: Regret;
  animationIndex?: number;
  linkable?: boolean;
}) {
  const router = useRouter();
  const [flagged, setFlagged] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCardClick = () => {
    if (linkable) router.push(`/regret/${regret.id}`);
  };

  const handleFlag = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (flagged) return;
    setFlagged(true);
    try {
      await fetch(`/api/regrets/${regret.id}/flag`, { method: "POST" });
    } catch {
      // Silent fail
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/regret/${regret.id}`;
    const preview =
      regret.text.length > 100
        ? regret.text.slice(0, 100) + "..."
        : regret.text;

    if (navigator.share) {
      try {
        await navigator.share({ text: `"${preview}"`, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const delayClass =
    animationIndex !== undefined
      ? `animate-delay-${Math.min(animationIndex % 5, 4)}`
      : "";

  return (
    <article
      className={`animate-fade-up ${delayClass} group relative bg-card/30 rounded-lg p-5 my-3 ${
        linkable ? "cursor-pointer hover:bg-card/50 transition-colors" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <blockquote className="m-0 p-0 border-0">
        <p className="text-base sm:text-lg leading-relaxed text-foreground font-light">
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

        {/* Engagement counts — only shown when non-zero */}
        {(regret.resonance_count > 0 || regret.reply_count > 0) && (
          <>
            <span className="text-border">·</span>
            {regret.resonance_count > 0 && (
              <span>{regret.resonance_count} felt this</span>
            )}
            {regret.resonance_count > 0 && regret.reply_count > 0 && (
              <span className="text-border">·</span>
            )}
            {regret.reply_count > 0 && (
              <span>{regret.reply_count} {regret.reply_count === 1 ? "reply" : "replies"}</span>
            )}
          </>
        )}

        <div
          className={`ml-auto flex items-center gap-3 transition-opacity duration-200 ${
            showActions ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleShare}
            className="text-muted/50 hover:text-muted cursor-pointer transition-colors"
            aria-label="Share this regret"
          >
            {copied ? "copied" : "share"}
          </button>

          <button
            onClick={handleFlag}
            className={`transition-all duration-200 ${
              flagged
                ? "text-muted/30 line-through cursor-default"
                : "text-muted/50 hover:text-muted cursor-pointer"
            }`}
            aria-label="Flag this regret"
            disabled={flagged}
          >
            {flagged ? "flagged" : "flag"}
          </button>
        </div>
      </footer>
    </article>
  );
}
