import type { CreateCowFormData } from "../schemas/createCow.schema";
import type { CreateCowDTO, CowPhase } from "../types/cow.types";

export function createCowFormToPayload(data: CreateCowFormData): CreateCowDTO {
  const breedPayload = data.breed.breed_id
    ? {
        breed_id: data.breed.breed_id,
        breed_name: undefined,
      }
    : {
        breed_id: undefined,
        breed_name: data.breed.breed_name?.trim(),
      };

  return {
    name: data.name,
    ear_tag: data.code,
    birth_date: data.birthDate,
    weight: Number(data.initialWeight),
    phase: data.phase as CowPhase,
    active: true,
    ...breedPayload,
  };
}
