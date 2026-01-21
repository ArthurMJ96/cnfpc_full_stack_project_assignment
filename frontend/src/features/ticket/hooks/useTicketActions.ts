import { ticketApi } from "../api";
import { useMutation, type UseMutationOptions } from "@/hooks/use-mutation";
import { useTicketStore } from "../contexts/TicketStoreContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutationOptions<TMethod extends (...args: any) => any> =
  UseMutationOptions<Awaited<ReturnType<TMethod>>, Parameters<TMethod>[number]>;

export const useCreateTicket = (
  options?: MutationOptions<typeof ticketApi.create>,
) => {
  const { setTicket } = useTicketStore();
  return useMutation(ticketApi.create, {
    ...options,
    onSuccess: (data, ...args) => {
      setTicket(data);
      options?.onSuccess?.(data, ...args);
    },
  });
};

export const useUpdateTicket = (
  options?: MutationOptions<typeof ticketApi.update>,
) => {
  const { setTicket } = useTicketStore();
  return useMutation(ticketApi.update, {
    ...options,
    onSuccess: (data, ...args) => {
      setTicket(data);
      options?.onSuccess?.(data, ...args);
    },
  });
};

export const useAssignSupport = (
  options?: MutationOptions<typeof ticketApi.assignSupport>,
) => {
  const { setTicket } = useTicketStore();
  return useMutation(ticketApi.assignSupport, {
    ...options,
    onSuccess: (data, ...args) => {
      setTicket(data);
      options?.onSuccess?.(data, ...args);
    },
  });
};

export const useUnassignSupport = (
  options?: MutationOptions<typeof ticketApi.unassignSupport>,
) => {
  const { setTicket } = useTicketStore();
  return useMutation(ticketApi.unassignSupport, {
    ...options,
    onSuccess: (data, ...args) => {
      setTicket(data);
      options?.onSuccess?.(data, ...args);
    },
  });
};

export const useAddComment = (
  options?: MutationOptions<typeof ticketApi.addComment>,
) => useMutation(ticketApi.addComment, options);

export const useUpdateComment = (
  options?: MutationOptions<typeof ticketApi.updateComment>,
) => useMutation(ticketApi.updateComment, options);

export const useDeleteComment = (
  options?: MutationOptions<typeof ticketApi.deleteComment>,
) => useMutation(ticketApi.deleteComment, options);
