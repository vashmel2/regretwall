export type RegretRow = {
  id: string;
  text: string;
  topic: string | null;
  age_range: string | null;
  recipient_name: string | null;
  created_at: string;
  is_hidden: boolean;
  flag_count: number;
};

// Public-facing type (what the main feed displays — no recipient_name)
export type Regret = {
  id: string;
  text: string;
  topic: string | null;
  age_range: string | null;
  created_at: string;
};

// Type for /regrets-for/[name] pages (includes recipient_name)
export type RegretForRecipient = Regret & {
  recipient_name: string;
};

export type RegretInsert = {
  text: string;
  topic?: string | null;
  age_range?: string | null;
  recipient_name?: string | null;
};

export type Database = {
  public: {
    Tables: {
      regrets: {
        Row: RegretRow;
        Insert: RegretInsert;
        Update: Partial<RegretRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      flag_regret: {
        Args: { regret_id: string; flagger_ip_hash: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
