import { useState, useCallback, useEffect, useRef } from "react";
import type { ErrorWithCause } from "@/lib/api";

interface UseQueryOptions<TData> {
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: ErrorWithCause) => void;
}

export const useQuery = <TData>(
  queryFn: () => Promise<TData>,
  deps: any[] = [],
  options: UseQueryOptions<TData> = {},
) => {
  const { enabled = true, onSuccess, onError } = options;
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<ErrorWithCause | undefined>();

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await queryFnRef.current();
      setData(result);
      onSuccessRef.current?.(result);
      return result;
    } catch (err) {
      const error = err as ErrorWithCause;
      setError(error);
      onErrorRef.current?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      refetch().catch(() => {});
    }
  }, [enabled, refetch, ...deps]);

  return { data, loading, error, refetch, setData };
};
