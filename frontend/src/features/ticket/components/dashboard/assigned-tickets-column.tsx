import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTickets } from "@/features/ticket/hooks/useTickets";
import { Ticket } from "@/features/ticket/components/ticket";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

type SortByOption = "status" | "due" | "updated";

export function AssignedTicketsColumn({ className }: { className?: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tickets, loading } = useTickets();
  const [sortBy, setSortBy] = useState<SortByOption>("due");

  const myTickets = tickets.filter((t) =>
    t.assignedTo?.some((u) => u.id === user?.id),
  );

  const sortedMyTickets = [...myTickets].sort((a, b) => {
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "due")
      return (
        new Date(a.dueAt || 0).getTime() - new Date(b.dueAt || 0).getTime()
      );
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (loading)
    return (
      <div className="flex justify-center p-4">
        <Spinner />
      </div>
    );

  return (
    <div className={`flex flex-col gap-4 h-full ${className}`}>
      <div className="flex items-center justify-between p-1 rounded-md bg-background/50 backdrop-blur-sm flex-none">
        <h2 className="text-lg font-bold px-2">Assigned to Me</h2>
        <Select
          value={sortBy}
          onValueChange={(v: SortByOption) => setSortBy(v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="updated">Recently Updated</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="due">Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="rounded-md h-px border bg-card flex-1">
        <div className="flex flex-col gap-6 p-4">
          {sortedMyTickets.length === 0 && (
            <div className="text-sm text-muted-foreground p-4 text-center border border-dashed rounded-lg">
              No tickets assigned to you.
            </div>
          )}
          {sortedMyTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="scale-95 origin-top-left w-[105%] -mb-2"
            >
              <Ticket
                ticket={ticket}
                onClick={() => navigate(`/ticket/${ticket.id}`)}
              />
            </div>
          ))}

          {sortedMyTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="scale-95 origin-top-left w-[105%] -mb-2"
            >
              <Ticket ticket={ticket} />
            </div>
          ))}
          {sortedMyTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="scale-95 origin-top-left w-[105%] -mb-2"
            >
              <Ticket ticket={ticket} />
            </div>
          ))}
          {sortedMyTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="scale-95 origin-top-left w-[105%] -mb-2"
            >
              <Ticket ticket={ticket} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
