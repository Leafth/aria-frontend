export type CowPhase =
  | "calf"
  | "heifer"
  | "young"
  | "primiparous"
  | "multiparous";
  
export type InactivationReason = "sale" | "death";

export interface Cow {
  id: string;
  name: string;
  ear_tag: string;
  birth_date: string;
  breed: string;
  weight: number;
  phase: CowPhase;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCowDTO {
  name: string;
  ear_tag: string;
  birth_date: string;
  breed: string;
  weight: number;
  phase: CowPhase;
  active: boolean;
}

export interface UpdateCowDTO {
  name?: string;
  ear_tag?: string;
  birth_date?: string;
  breed?: string;
}

export interface InactivateCowDTO {
  reason: InactivationReason;
  observation?: string;
}

export interface CowFilters {
  page?: number;
  per_page?: number;
  q?: string;
  birth_from?: string;
  birth_to?: string;
  weight_from?: number;
  weight_to?: number;
  phase?: CowPhase;
  active?: boolean;
  created_from?: string;
  created_to?: string;
  sort_by?: "name" | "breed" | "birth_date" | "weight" | "created_at";
  sort_dir?: "asc" | "desc";
}

export interface PaginatedCowsResponse {
  data: Cow[];
  meta: {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
  };
}
