import { useState } from 'react';
import { useTickets } from '@/features/ticket/hooks/useTickets';
import { Ticket } from '@/features/ticket/components/ticket';
import { Button } from '@/components/ui/button';
import { TicketStatus } from '@shared/enums';
import { Skeleton } from "@/components/ui/skeleton";

export function TicketQueueColumn() {
  const { tickets, loading } = useTickets();
  const [activeTab, setActiveTab] = useState<'unassigned' | 'new'>('new');

  const unassignedTickets = tickets.filter(t =>
    (!t.assignedTo || t.assignedTo.length === 0) &&
    t.status !== TicketStatus.CLOSED &&
    t.status !== TicketStatus.RESOLVED
  );

  // Defining "New" as OPEN tickets, sorted by creation date
  const newTickets = tickets.filter(t =>
    t.status === TicketStatus.OPEN
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const displayTickets = activeTab === 'unassigned' ? unassignedTickets : newTickets;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg w-fit flex-none">
        <Button
          variant={activeTab === 'new' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 text-xs"
          onClick={() => setActiveTab('new')}
        >
          New Tickets ({newTickets.length})
        </Button>
        <Button
          variant={activeTab === 'unassigned' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 text-xs"
          onClick={() => setActiveTab('unassigned')}
        >
          Unassigned ({unassignedTickets.length})
        </Button>
      </div>
      <div className="flex flex-col gap-6">

        {
          loading ? (
            // Loading skeletons
            <div className="relative flex flex-col gap-4 after:contents before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:to-background before:z-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                  <Skeleton className="h-48 flex-1" />
                </div>
              ))}
            </div>
          ) : displayTickets.length === 0 ? (
            // No tickets message
            <div className="text-sm text-muted-foreground p-4 text-center border border-dashed rounded-lg">
              No tickets in this queue.
            </div>
          ) : (displayTickets.map((ticket) => (
            // Ticket Cards
            <Ticket key={ticket.id} ticket={ticket} />
          )))
        }
      </div>
    </div>
  );
}