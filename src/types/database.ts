export type RegretRow = {
  id: string;
  text: string;
  topic: string | null;
  age_range: string | null;
  recipient_name: string | null;
  created_at: string;
  is_hidden: boolean;
  flag_count: number;
  resonance_count: number;
  reply_count: number;
  slug: string | null;
};

// Public-facing type (what the main feed displays)
export type Regret = {
  id: string;
  text: string;
  topic: string | null;
  age_range: string | null;
  created_at: string;
  resonance_count: number;
  reply_count: number;
  slug: string | null;
};

// Type for /regrets-for/[name] pages (includes recipient_name)
export type RegretForRecipient = Regret & {
  recipient_name: string;
};

export type RegretInsert = {
  id?: string;
  text: string;
  topic?: string | null;
  age_range?: string | null;
  recipient_name?: string | null;
  slug?: string | null;
};

export type RegretReply = {
  id: string;
  regret_id: string;
  text: string;
  created_at: string;
};

export type RegretReplyInsert = {
  regret_id: string;
  text: string;
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
      regret_replies: {
        Row: RegretReply & { is_hidden: boolean; flag_count: number };
        Insert: RegretReplyInsert;
        Update: Partial<RegretReply>;
        Relationships: [];
      };
      regret_resonances: {
        Row: {
          id: string;
          regret_id: string;
          ip_hash: string;
          created_at: string;
        };
        Insert: { regret_id: string; ip_hash: string };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      flag_regret: {
        Args: { regret_id: string; flagger_ip_hash: string };
        Returns: boolean;
      };
      resonate_regret: {
        Args: { p_regret_id: string; p_ip_hash: string };
        Returns: { is_new: boolean; count: number };
      };
      increment_reply_count: {
        Args: { p_regret_id: string };
        Returns: void;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
