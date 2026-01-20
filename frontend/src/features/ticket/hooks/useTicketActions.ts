import { ticketApi } from "../api";
import { useMutation } from "@/hooks/use-mutation";
import type { ErrorWithCause } from "@/lib/api";

type MutationOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: ErrorWithCause) => void;
};

export const useCreateTicket = (options?: MutationOptions<any>) =>
  useMutation(ticketApi.create, options);

export const useUpdateTicket = (options?: MutationOptions<any>) =>
  useMutation(ticketApi.update, options);

export const useAssignSupport = (options?: MutationOptions<any>) =>
  useMutation(
    ({ ticketId, supportId }: { ticketId: number; supportId: number }) =>
      ticketApi.assignSupport(ticketId, supportId),
    options,
  );

export const useUnassignSupport = (options?: MutationOptions<void>) =>
  useMutation(
    ({ ticketId, supportId }: { ticketId: number; supportId: number }) =>
      ticketApi.unassignSupport(ticketId, supportId),
    options,
  );

export const useAddComment = (options?: MutationOptions<any>) =>
  useMutation(ticketApi.addComment, options);

export const useUpdateComment = (options?: MutationOptions<any>) =>
  useMutation(ticketApi.updateComment, options);

export const useDeleteComment = (options?: MutationOptions<void>) =>
  useMutation(ticketApi.deleteComment, options);
