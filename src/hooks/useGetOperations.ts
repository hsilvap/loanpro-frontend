import { useQuery } from "@tanstack/react-query";
import { getOperations } from "../api/operations";
import type { Operation } from "../types/operation";

const useGetOperations = () =>
  useQuery<Operation[]>({
    queryKey: ["operations"],
    queryFn: () => getOperations(),
  });

export default useGetOperations;
