import { TicketForm } from "@/features/ticket/components/ticket-form";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <TicketForm
      onSubmit={(ticket) => {
        console.log("Ticket created:", ticket);
        navigate(`/ticket/${ticket.id}`);
      }}
    />
  );
}
