import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";
export const alt = "An anonymous regret shared on RegretWall";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let text = "An anonymous regret shared on RegretWall.";
  let topic: string | null = null;

  if (supabase) {
    const { data } = await supabase
      .from("regrets")
      .select("text, topic")
      .eq("id", id)
      .eq("is_hidden", false)
      .single();

    if (data) {
      text = data.text;
      topic = data.topic;
    }
  }

  // Truncate for image readability
  const displayText =
    text.length > 280 ? text.slice(0, 280) + "..." : text;

  // Adjust font size based on text length
  const fontSize = displayText.length > 180 ? 28 : displayText.length > 100 ? 32 : 38;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d0d0d",
          padding: "60px 80px",
        }}
      >
        {/* Regret text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            maxWidth: "1000px",
          }}
        >
          <p
            style={{
              color: "#e0ddd8",
              fontSize: `${fontSize}px`,
              fontWeight: 300,
              lineHeight: 1.6,
              textAlign: "center",
              margin: 0,
            }}
          >
            &ldquo;{displayText}&rdquo;
          </p>
          {topic && (
            <span
              style={{
                color: "#8a8a8a",
                fontSize: "16px",
                marginTop: "24px",
              }}
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </span>
          )}
        </div>

        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "#c4a882",
              fontSize: "18px",
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
            }}
          >
            RegretWall
          </span>
          <span style={{ color: "#2a2a2a", fontSize: "18px" }}>
            ·
          </span>
          <span style={{ color: "#8a8a8a", fontSize: "16px" }}>
            Anonymous regrets from real people
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
