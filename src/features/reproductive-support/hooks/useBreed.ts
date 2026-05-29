import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../services/breed.service";

export function useBreeds() {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: getBreeds,
  });
}