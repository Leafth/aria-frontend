export type CowPhase =
  | "calf"
  | "heifer"
  | "young"
  | "primiparous"
  | "multiparous"

export type CowReproductiveStatus =
  | "open"
  | "in_heat"
  | "inseminated"
  | "pregnant"
  | "calved"
  | "postpartum";

export type RecommendedNextAction =
  | "heat_detection"
  | "insemination"
  | "pregnancy_check"
  | "calving"
  | "weighing"
  | "phase_change"
  | null;

export type InactivationReason = "sale" | "death";

export interface ChangeCowPhaseDTO {
  phase: "calf" | "heifer" | "young";
}

export type AlertLevel = "info" | "warning" | "danger";

export type PregnancyResult = "positive" | "negative";

export interface Cow {
  id: string;
  name: string;
  ear_tag: string;
  birth_date: string;
  breed: string;
  weight: string;
  phase: CowPhase;
  reproductive_status: CowReproductiveStatus;
  active: boolean;
  insights?: CowListInsights;
  inactive_status?: CowInactiveStatus;
}

export interface CowListAlert {
  level: AlertLevel;
  code: string;
  message: string;
}

export interface CowListStatusInsight {
  code: CowReproductiveStatus;
  message: string;
  occurred_at: string | null;
}

export interface CowListInsights {
  status?: CowListStatusInsight;
  alerts?: CowListAlert[];
}

export interface CowInactiveStatus {
  inactivated_at: string;
  inactivated_reason: InactivationReason;
}

export interface CowInactiveStatus {
  inactivated_at: string;
  inactivated_reason: InactivationReason;
}
export interface CowDetails {
  id: string;
  name: string;
  ear_tag: string;
  birth_date: string;
  breed: string;
  active: boolean;
  insights: CowInsights;
  inactive_status?: CowInactiveStatus | null;
}

export interface CowInsights {
  reproductive_status: ReproductiveStatusInsight;
  weight_insight: WeightInsight;
  phase_insight: PhaseInsight;
  recommended_next_action: RecommendedNextAction;
}

export interface ReproductiveStatusAlert {
  level: AlertLevel;
  code: string;
  message: string;
}

export interface ReproductiveStatusInsight {
  status: CowReproductiveStatus;
  message: string;
  observation: string | null;
  alerts: ReproductiveStatusAlert[];
}

export interface RegisterInseminationDTO {
  event: {
    event_type: "insemination";
    occurred_at: string;
    data: {
      method: InseminationMethod;
      bull_id: string;
    };
  };
}

export interface RegisterPregnancyCheckDTO {
  event: {
    event_type: "pregnancy_check";
    occurred_at: string;
    data: {
      result: PregnancyResult;
    };
  };
}

export interface RegisterCalvingDTO {
  event: {
    event_type: "calving";
    occurred_at: string;
    data?: {
      observation?: string;
    };
  };
}

export interface WeightInsight {
  current_weight: string | null;
  last_weighing_at: string | null;
}

export interface PhaseInsight {
  current_phase: CowPhase;
  message: string | null;
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

export interface RegisterCowWeightDTO {
  weight: number;
  occurred_at: string;
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

export type EventType =
  | "heat_detection"
  | "heat_detection_with_insemination"
  | "insemination"
  | "pregnancy_check"
  | "calving";

export type InseminationMethod = "natural_mating" | "artificial_insemination";

export interface RegisterHeatDetectionDTO {
  event: {
    event_type: "heat_detection";
    occurred_at: string;
    data?: {
      observation?: string;
    };
  };
}

export interface RegisterHeatDetectionWithInseminationDTO {
  event: {
    event_type: "heat_detection_with_insemination";
    heat_occurred_at: string;
    insemination_occurred_at: string;
    data: {
      method: InseminationMethod;
      bull_id: string;
      heat_observation?: string;
    };
  };
}
