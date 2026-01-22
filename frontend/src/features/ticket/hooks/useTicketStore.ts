import { useContext } from "react";
import { TicketStoreContext } from "../contexts/TicketStoreContext";

export const useTicketStore = () => {
  const context = useContext(TicketStoreContext);
  if (context === undefined) {
    throw new Error("useTicketStore must be used within a TicketStoreProvider");
  }
  return context;
};
