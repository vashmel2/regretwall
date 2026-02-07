import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <span className="block text-xs tracking-widest uppercase text-muted mb-6">
          RegretWall
        </span>
        <h1 className="text-2xl font-light text-foreground mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-sm text-muted mb-8">
          Maybe that&apos;s something to regret. Maybe not.
        </p>
        <Link
          href="/"
          className="text-sm text-accent hover:underline"
        >
          Back to the wall
        </Link>
      </div>
    </main>
  );
}
