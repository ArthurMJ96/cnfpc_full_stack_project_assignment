
import { useTickets } from '@/features/ticket/hooks/useTickets';
import { Ticket } from '@/features/ticket/components/ticket';
import { TicketStatus } from '@shared/enums';
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TicketQueueColumn() {
  const { tickets, loading } = useTickets();

  const unassignedTickets = tickets.filter(t =>
    (!t.assignedTo || t.assignedTo.length === 0) &&
    t.status !== TicketStatus.CLOSED &&
    t.status !== TicketStatus.RESOLVED
  );

  // Sort by creation date
  const newTickets = tickets.filter(t =>
    t.status === TicketStatus.OPEN
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const renderTicketList = (displayTickets: typeof tickets) => (
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
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="new">New Tickets ({newTickets.length})</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned ({unassignedTickets.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          {renderTicketList(newTickets)}
        </TabsContent>
        <TabsContent value="unassigned" className="mt-4">
          {renderTicketList(unassignedTickets)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
