import { useState, useCallback } from "react";
import type { ErrorWithCause } from "@/lib/api";

type MutationFunction<TData, TVariables> = (
  variables: TVariables,
) => Promise<TData>;

interface UseMutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: ErrorWithCause) => void;
}

export const useMutation = <TData, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
  options: UseMutationOptions<TData> = {},
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithCause | undefined>();

  const mutate = useCallback(
    async (variables: TVariables) => {
      setLoading(true);
      setError(undefined);
      try {
        const result = await mutationFn(variables);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err as ErrorWithCause;
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, options],
  );

  const flushError = () => {
    setError(undefined);
  };
  const flushData = () => {
    setData(null);
  };

  return { mutate, data, loading, error, flushError, flushData };
};
