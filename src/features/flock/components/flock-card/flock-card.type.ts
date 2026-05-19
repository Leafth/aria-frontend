import type { CowListAlert } from "../../types/cow.types";

export interface FlockCardProps {
  id: string;
  name: string;
  code: string;
  breed: string;
  phase: string;
  age: string;
  weight: string;
  colorCard: string;

  active: boolean;
  statusMessage?: string;
  statusDate?: string | null;
  alert?: CowListAlert | null;
  inactiveReason?: string;
}