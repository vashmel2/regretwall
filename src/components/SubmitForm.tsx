"use client";

import { useState, useRef } from "react";
import type { Regret } from "@/types/database";

const TOPICS = [
  { value: "", label: "Topic" },
  { value: "love", label: "Love" },
  { value: "career", label: "Career" },
  { value: "money", label: "Money" },
  { value: "family", label: "Family" },
  { value: "health", label: "Health" },
  { value: "fear", label: "Fear" },
];

export default function SubmitForm({
  onSubmitted,
}: {
  onSubmitted: (regret: Regret) => void;
}) {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = text.trim().length;
  const isValid = charCount >= 5 && charCount <= 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/regrets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          topic: topic || undefined,
          recipient_name: recipientName.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const { regret } = await res.json();
      onSubmitted(regret);
      const savedName = recipientName.trim() || null;
      setText("");
      setTopic("");
      setRecipientName("");
      setSubmittedName(savedName);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSubmittedName(null);
      }, 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-8">
      <div className="border border-border rounded-lg p-4 sm:p-6 bg-card/50 transition-colors">
        <label htmlFor="regret-input" className="block text-sm text-muted mb-3">
          Share something you wish you had done differently.
        </label>

        <textarea
          ref={textareaRef}
          id="regret-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I wish I had told them how I felt..."
          rows={3}
          maxLength={500}
          className="w-full bg-transparent text-foreground placeholder:text-muted/40 text-base leading-relaxed resize-none focus:outline-none"
        />

        {/* "For" field — prominent, its own row */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Is this regret for someone? Enter their first name"
            maxLength={50}
            className="w-full bg-transparent text-sm text-foreground border border-border/50 rounded-lg px-3 py-2.5 focus:outline-none focus:border-muted placeholder:text-muted/40 transition-colors"
          />
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-transparent text-xs text-muted border border-border/50 rounded px-2 py-1.5 focus:outline-none focus:border-muted cursor-pointer"
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            <span className="text-xs text-muted/50 ml-1">
              {charCount > 0 && `${charCount}/500`}
            </span>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="text-sm px-4 py-1.5 rounded bg-foreground/10 text-foreground hover:bg-foreground/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {isSubmitting ? "..." : "Submit anonymously"}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 mt-2">{error}</p>
        )}

        {submitted && (
          <div className="text-sm text-accent mt-2 animate-fade-up">
            <p>Your regret has been added to the wall.</p>
            {submittedName && (
              <p className="mt-1 text-muted text-xs">
                Share this link with them:{" "}
                <span className="text-accent select-all">
                  regretwall.com/regrets-for/{submittedName.toLowerCase()}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
