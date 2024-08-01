import { useQuery } from "@tanstack/react-query";
import { Record } from "../types/record";
import { getRecords } from "../api/records";
import { PaginatedData, PaginatedRequest } from "../types/common";

const useGetRecords = (params?: PaginatedRequest) =>
  useQuery<PaginatedData<Record>>({
    queryKey: ["records", { params }],
    queryFn: () => getRecords(params),
  });

export default useGetRecords;
