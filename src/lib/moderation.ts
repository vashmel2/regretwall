/**
 * Basic content moderation filter.
 * Returns a rejection reason if content is blocked, or null if it passes.
 */

// Slurs and hate speech (partial list — extend as needed)
const BLOCKED_WORDS = [
  "nigger",
  "nigga",
  "faggot",
  "retard",
  "kike",
  "spic",
  "chink",
  "wetback",
  "tranny",
];

// Patterns that indicate spam or abuse
const SPAM_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /\.com\b/i,
  /\.net\b/i,
  /\.org\b/i,
  /\.io\b/i,
  /buy now/i,
  /click here/i,
  /free money/i,
  /subscribe/i,
  /check out my/i,
  /follow me/i,
  /dm me/i,
  /whatsapp/i,
  /telegram/i,
  /discord\.gg/i,
  /bit\.ly/i,
  /tinyurl/i,
];

// Repeated character abuse (e.g., "aaaaaaa" or "!!!!!!!")
const REPETITION_PATTERN = /(.)\1{9,}/;

// All caps abuse (more than 80% uppercase in a string longer than 20 chars)
function isExcessiveCaps(text: string): boolean {
  if (text.length < 20) return false;
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return false;
  const uppercase = letters.replace(/[^A-Z]/g, "").length;
  return uppercase / letters.length > 0.8;
}

export function moderateContent(text: string): string | null {
  const lower = text.toLowerCase();

  // Check blocked words (as whole words)
  for (const word of BLOCKED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    if (regex.test(lower)) {
      return "Your submission contains language that isn't allowed.";
    }
  }

  // Check spam patterns
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      return "Submission flagged as spam.";
    }
  }

  // Check repeated characters
  if (REPETITION_PATTERN.test(text)) {
    return "Please write a genuine regret.";
  }

  // Check excessive caps
  if (isExcessiveCaps(text)) {
    return "Please avoid using all caps.";
  }

  return null;
}
