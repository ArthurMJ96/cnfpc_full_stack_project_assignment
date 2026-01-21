/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { TicketResponseDTO } from "@shared/dtos";

interface TicketStoreContextType {
  tickets: Record<number, TicketResponseDTO>;
  setTicket: (ticket: TicketResponseDTO) => void;
  setTickets: (tickets: TicketResponseDTO[]) => void;
  getTicket: (id: number) => TicketResponseDTO | undefined;
}

export const TicketStoreContext = createContext<TicketStoreContextType | undefined>(undefined);

export function TicketStoreProvider({ children }: { children: ReactNode }) {
  const [tickets, setTicketsState] = useState<Record<number, TicketResponseDTO>>({});

  const setTicket = useCallback((ticket: TicketResponseDTO) => {
    setTicketsState((prev) => ({
      ...prev,
      [ticket.id]: ticket,
    }));
  }, []);

  const setTickets = useCallback((newTickets: TicketResponseDTO[]) => {
    setTicketsState((prev) => {
      const next = { ...prev };
      newTickets.forEach((ticket) => {
        next[ticket.id] = ticket;
      });
      return next;
    });
  }, []);

  const getTicket = useCallback((id: number) => {
    return tickets[id];
  }, [tickets]);

  return (
    <TicketStoreContext.Provider value={{ tickets, setTicket, setTickets, getTicket }}>
      {children}
    </TicketStoreContext.Provider>
  );
}

export const useTicketStore = () => {
  const context = useContext(TicketStoreContext);
  if (context === undefined) {
    throw new Error("useTicketStore must be used within a TicketStoreProvider");
  }
  return context;
};
