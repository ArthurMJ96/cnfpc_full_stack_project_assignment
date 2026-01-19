import { useParams } from 'react-router-dom';
import { useTicket } from '@/features/ticket/hooks/useTicket';
import { Ticket } from '@/features/ticket/components/ticket';

export function TicketDetailsPage() {
    const { id } = useParams();
    const { ticket, loading } = useTicket(Number(id));
    
    if (loading) return <div>Loading...</div>;
    if (!ticket) return <div>Not found</div>;

    return (
        <div>
            {/* <pre>
                {JSON.stringify(ticket, null, 2)}
            </pre> */}
            <Ticket data={ticket} />
        </div>
    );
}