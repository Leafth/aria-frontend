import { api } from "@/lib/api";
import type { BreedDTO } from "../types/breed.types";

export async function getBreeds() {
  const response = await api.get<BreedDTO[]>("/breeds");

  return response.data;
}