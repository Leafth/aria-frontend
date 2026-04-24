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
