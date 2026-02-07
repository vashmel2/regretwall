export type RegretRow = {
  id: string;
  text: string;
  topic: string | null;
  age_range: string | null;
  created_at: string;
  is_hidden: boolean;
  flag_count: number;
};

// Public-facing type (what the feed displays)
export type Regret = {
  id: string;
  text: string;
  topic: string | null;
  age_range: string | null;
  created_at: string;
};

export type RegretInsert = {
  text: string;
  topic?: string | null;
  age_range?: string | null;
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
        Args: { regret_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
