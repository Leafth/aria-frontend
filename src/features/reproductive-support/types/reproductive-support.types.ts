export interface CompanyDTO {
  name: string;
  description?: string;
}

export type BullOrigin = "local" | "company";

export interface BullDTO {
  id: number;
  name: string;
  breed: string;
  origin: BullOrigin;
  ear_tag: string | null;
  company_id: number | null;
  company?: {
    id: number;
    name: string;
  } | null;
}

export interface BullParams {
  page?: number;
  per_page?: number;
  q?: string;
  origin?: BullOrigin;
  company_id?: number;
  sort_by?: "name" | "breed" | "created_at";
  sort_dir?: "asc" | "desc";
}