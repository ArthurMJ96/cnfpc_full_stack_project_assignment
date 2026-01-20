import { ticketApi } from "../api";
import { useMutation, type UseMutationOptions } from "@/hooks/use-mutation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutationOptions<TMethod extends (...args: any) => any> =
  UseMutationOptions<Awaited<ReturnType<TMethod>>, Parameters<TMethod>[number]>;

export const useCreateTicket = (
  options?: MutationOptions<typeof ticketApi.create>,
) => useMutation(ticketApi.create, options);

export const useUpdateTicket = (
  options?: MutationOptions<typeof ticketApi.update>,
) => useMutation(ticketApi.update, options);

export const useAssignSupport = (
  options?: MutationOptions<typeof ticketApi.assignSupport>,
) => useMutation(ticketApi.assignSupport, options);

export const useUnassignSupport = (
  options?: MutationOptions<typeof ticketApi.unassignSupport>,
) => useMutation(ticketApi.unassignSupport, options);

export const useAddComment = (
  options?: MutationOptions<typeof ticketApi.addComment>,
) => useMutation(ticketApi.addComment, options);

export const useUpdateComment = (
  options?: MutationOptions<typeof ticketApi.updateComment>,
) => useMutation(ticketApi.updateComment, options);

export const useDeleteComment = (
  options?: MutationOptions<typeof ticketApi.deleteComment>,
) => useMutation(ticketApi.deleteComment, options);
