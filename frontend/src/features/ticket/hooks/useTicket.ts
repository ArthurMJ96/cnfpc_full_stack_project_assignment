import { ticketApi } from "../api";
import { useQuery } from "@/hooks/use-query";

export const useTicket = (id: number | undefined) => {
  const {
    data: ticket,
    loading,
    error,
    refetch: refreshTicket,
  } = useQuery(() => ticketApi.getById(id!), [id], {
    enabled: !!id,
  });

  return { ticket, loading, error, refreshTicket };
};

