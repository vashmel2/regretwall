"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NameSearchForm({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const [name, setName] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim().toLowerCase();
    if (trimmed) {
      router.push(`/regrets-for/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a first name..."
        maxLength={50}
        autoFocus
        className="flex-1 bg-transparent text-foreground border border-border rounded-lg px-4 py-3 text-base placeholder:text-muted/40 focus:outline-none focus:border-muted transition-colors"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="px-6 py-3 rounded-lg bg-foreground/10 text-foreground text-sm hover:bg-foreground/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
