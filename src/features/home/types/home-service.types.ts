export interface ReproductiveSummaryApi {
  total: number;
  active: number;
  inactive: number;
  open: number;
  in_heat: number;
  inseminated: number;
  pregnant: number;
  postpartum: number;
}

export interface PhaseSummaryApi {
  total: number;
  calf: number;
  heifer: number;
  young: number;
  primiparous: number;
  multiparous: number;
}

export type AlertLevelApi = "warning" | "danger";

export interface AlertApi {
  cow_id: string;
  cow_name: string;
  ear_tag: string;
  level: AlertLevelApi;
  code: string;
  message: string;
}

export interface LastEventApi {
  id: string;
  event_type:
    | "pregnancy_check"
    | "insemination"
    | "heat_detection"
    | "weighing"
    | "calving"
    | string;
  title: string;
  occurred_at: string;
  observation: string | null;
  cow_name: string;
  ear_tag: string;
}

export interface EventsResponseApi {
  data: LastEventApi[];
  meta: {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
  };
}
