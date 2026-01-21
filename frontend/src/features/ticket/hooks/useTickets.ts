import { ticketApi } from "../api";
import { useQuery } from "@/hooks/use-query";
import { useTicketStore } from "../contexts/TicketStoreContext";

export const useTickets = () => {
  const { setTickets, tickets: ticketStore } = useTicketStore();

  const {
    loading,
    error,
    refetch: refreshTickets,
  } = useQuery(ticketApi.getAll, [], {
    onSuccess: (data) => setTickets(data),
  });

  const tickets = Object.values(ticketStore);

  return { tickets, loading, error, refreshTickets };
};
