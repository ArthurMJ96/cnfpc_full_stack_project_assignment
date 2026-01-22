import { TicketDetails } from "@/features/ticket/components/ticket-detail";
import { Navigate, useParams } from "react-router-dom";


export function TicketDetailsPage() {
  const { id } = useParams();

  if (!id) return <Navigate to="/error" replace state={{ error: { message: "No ID provided" } }} />;
  const ticketId = parseInt(id, 10);
  if (isNaN(ticketId)) return <Navigate to="/error" replace state={{ error: { message: "Invalid Ticket ID format" } }} />;

  return <TicketDetails key={ticketId} ticketId={ticketId} />;
}


export default TicketDetailsPage;