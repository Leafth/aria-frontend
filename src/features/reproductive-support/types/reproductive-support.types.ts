export interface CompanyDTO {
  id: number;
  name: string;
  description?: string;
}

export type BullOrigin = "local" | "company";

export interface BullDTO {
  id: string;
  name: string;
  breed_id: string;
  breed_name?: string;
  breed?: {
    id: string;
    name: string;
  };
  origin: BullOrigin;
  ear_tag: string | null;
  company_id: string | null;
  company?: {
    id: string;
    name: string;
  } | null;
}

export interface CreateBullDTO {
  name: string;
  origin: BullOrigin;
  ear_tag?: string | null;
  company_id?: string | null;
  breed_id?: string;
  breed_name?: string;
}

export interface UpdateBullDTO {
  name: string;
  origin: BullOrigin;
  ear_tag?: string | null;
  company_id?: string | null;
  breed_id?: string;
  breed_name?: string;
}

export interface BullParams {
  page?: number;
  per_page?: number;
  q?: string;
  origin?: BullOrigin;
  company_id?: string;
  sort_by?: "name" | "breed" | "created_at";
  sort_dir?: "asc" | "desc";
}
