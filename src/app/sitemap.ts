import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://regretwall.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/regrets-for`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/why-people-regret-things`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  if (!supabase) return staticRoutes;

  const { data } = await supabase
    .from("regrets")
    .select("slug, id, created_at")
    .eq("is_hidden", false)
    .not("slug", "is", null)
    .order("created_at", { ascending: false })
    .limit(1000);

  const regretRoutes: MetadataRoute.Sitemap = (data ?? []).map((r) => ({
    url: `${BASE_URL}/regret/${r.slug ?? r.id}`,
    lastModified: new Date(r.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...regretRoutes];
}
