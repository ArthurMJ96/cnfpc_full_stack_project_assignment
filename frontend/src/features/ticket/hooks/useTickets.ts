import { ticketApi } from "../api";
import { useQuery } from "@/hooks/use-query";

export const useTickets = () => {
  const {
    data: tickets,
    loading,
    error,
    refetch: refreshTickets,
  } = useQuery(ticketApi.getAll);

  return { tickets: tickets || [], loading, error, refreshTickets };
};
