import { ticketApi } from "../api";
import { useQuery } from "@/hooks/use-query";
import { useTicketStore } from "../contexts/TicketStoreContext";

export const useTicket = (id: number | undefined) => {
  const { setTicket, getTicket } = useTicketStore();
  const ticketFromStore = id ? getTicket(id) : undefined;

  const {
    loading,
    error,
    refetch: refreshTicket,
  } = useQuery(() => ticketApi.getById(id!), [id], {
    enabled: !!id,
    onSuccess: (data) => setTicket(data),
  });

  return { ticket: ticketFromStore, loading, error, refreshTicket };
};

