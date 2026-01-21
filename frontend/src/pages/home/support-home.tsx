import { AssignedTicketsColumn } from '@/features/ticket/components/dashboard/assigned-tickets-column';
import { TicketQueueColumn } from '@/features/ticket/components/dashboard/ticket-queue-column';

export default function SupportHome() {
    return (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
                <AssignedTicketsColumn />
            </div>
            <TicketQueueColumn />
        </div>
    );
}