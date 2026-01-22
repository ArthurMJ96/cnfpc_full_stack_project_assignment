import { TicketForm } from "@/features/ticket/components/ticket-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CreateTicketPage() {
  const navigate = useNavigate();
  return (
    <div className="container max-w-2xl mx-auto py-6 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Ticket</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TicketForm
        onSubmit={(ticket) => {
          console.log("Ticket created:", ticket);
          navigate(`/ticket/${ticket.id}`);
        }}
      />
    </div>
  );
}
