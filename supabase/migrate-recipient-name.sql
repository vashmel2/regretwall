-- Migration: Add recipient_name column for "leave a regret for someone" feature
-- Run this against your Supabase database

-- Add nullable recipient_name column
ALTER TABLE regrets ADD COLUMN IF NOT EXISTS recipient_name text;

-- Constraint: max 50 characters
ALTER TABLE regrets ADD CONSTRAINT regrets_recipient_name_length CHECK (
  recipient_name IS NULL OR char_length(recipient_name) <= 50
);

-- Index for case-insensitive name lookups
CREATE INDEX IF NOT EXISTS idx_regrets_recipient_name ON regrets (lower(recipient_name))
WHERE recipient_name IS NOT NULL;
