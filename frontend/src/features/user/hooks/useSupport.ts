import { userApi } from "../api";
import { useQuery } from "@/hooks/use-query";

export const useSupports = (options?: { enabled?: boolean }) => {
  const {
    data: supports,
    loading,
    error,
    refetch: refreshSupports,
  } = useQuery(userApi.getAllSupports, [], options);

  return { supports: supports || [], loading, error, refreshSupports };
};
