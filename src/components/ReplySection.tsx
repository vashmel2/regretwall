"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { RegretReply } from "@/types/database";

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

const MAX_CHARS = 300;

export default function ReplySection({
  regretId,
  initialReplies,
  initialNextCursor,
  initialResonanceCount,
}: {
  regretId: string;
  initialReplies: RegretReply[];
  initialNextCursor: string | null;
  initialResonanceCount: number;
}) {
  const [replies, setReplies] = useState<RegretReply[]>(initialReplies);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [loadingMore, setLoadingMore] = useState(false);

  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [resonanceCount, setResonanceCount] = useState(initialResonanceCount);
  const [resonated, setResonated] = useState(false);
  const [resonating, setResonating] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Restore resonance state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setResonated(localStorage.getItem(`resonated-${regretId}`) === "1");
    }
  }, [regretId]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/regrets/${regretId}/replies?cursor=${encodeURIComponent(nextCursor)}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setReplies((prev) => [...prev, ...data.replies]);
      setNextCursor(data.nextCursor);
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore, regretId]);

  // Infinite scroll for replies
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  const handleResonate = async () => {
    if (resonated || resonating) return;
    setResonating(true);
    // Optimistic update
    setResonanceCount((c) => c + 1);
    setResonated(true);
    try {
      const res = await fetch(`/api/regrets/${regretId}/resonate`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setResonanceCount(data.count);
        localStorage.setItem(`resonated-${regretId}`, "1");
      } else {
        // Roll back if already resonated server-side (409 from dedup)
        setResonanceCount((c) => c - 1);
        setResonated(false);
      }
    } catch {
      setResonanceCount((c) => c - 1);
      setResonated(false);
    } finally {
      setResonating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/regrets/${regretId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong.");
        return;
      }
      setReplies((prev) => [...prev, data.reply]);
      setText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-border pt-8">
      {/* Felt this */}
      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={handleResonate}
          disabled={resonated || resonating}
          className={`text-sm transition-colors ${
            resonated
              ? "text-accent cursor-default"
              : "text-muted hover:text-foreground cursor-pointer"
          }`}
        >
          {resonated ? "you felt this" : "felt this"}
        </button>
        {resonanceCount > 0 && (
          <span className="text-xs text-muted">
            {resonanceCount} {resonanceCount === 1 ? "person" : "people"} felt this
          </span>
        )}
      </div>

      {/* Reply form */}
      <div className="mb-8">
        <p className="text-xs text-muted mb-3 uppercase tracking-widest">
          Leave a reply
        </p>
        {submitted ? (
          <p className="text-sm text-muted">Your reply was posted anonymously.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_CHARS}
              rows={3}
              placeholder="Say something. Anonymously."
              className="w-full bg-card/30 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted/50 resize-none focus:outline-none focus:ring-1 focus:ring-border"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted/50">
                {text.length}/{MAX_CHARS}
              </span>
              <button
                type="submit"
                disabled={!text.trim() || submitting}
                className="text-sm text-accent hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer disabled:cursor-default transition-opacity"
              >
                {submitting ? "posting..." : "post anonymously"}
              </button>
            </div>
            {submitError && (
              <p className="text-xs text-red-400">{submitError}</p>
            )}
          </form>
        )}
      </div>

      {/* Replies list */}
      {replies.length > 0 && (
        <div className="space-y-6">
          <p className="text-xs text-muted uppercase tracking-widest">
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </p>
          {replies.map((reply) => (
            <div key={reply.id} className="border-l border-border pl-4">
              <p className="text-sm text-foreground leading-relaxed">
                {reply.text}
              </p>
              <time className="text-xs text-muted/60 mt-1 block">
                {timeAgo(reply.created_at)}
              </time>
            </div>
          ))}
          {nextCursor && (
            <div ref={loaderRef} className="text-center py-2">
              {loadingMore && (
                <span className="text-xs text-muted/50">Loading more...</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
