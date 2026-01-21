import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { TicketResponseDTO } from '@shared/dtos';
import { TicketPriority } from '@shared/enums';

const priorityColor = {
    [TicketPriority.LOW]: "text-green-600! bg-green-600/10!",
    [TicketPriority.MEDIUM]: "text-yellow-600! bg-yellow-600/10!",
    [TicketPriority.HIGH]: "text-orange-600! bg-orange-600/10!",
    [TicketPriority.URGENT]: "text-destructive! bg-destructive/10!",
} as const;

export function TicketPriorityBadge({ ticket, side = "left" }: { ticket: TicketResponseDTO, side?: React.ComponentProps<typeof TooltipContent>["side"] }) {

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                    variant="destructive"
                    className={
                        "font-bold select-none rounded-sm " +
                        priorityColor[ticket.priority]
                    }
                >
                    {ticket.priority}
                </Badge>
            </TooltipTrigger>
            <TooltipContent align="center" side={side} className='text-center'>
                <p>Priority Status</p>
                {ticket.sentiment && <p>Detected sentiment: {ticket.sentiment}</p>}
            </TooltipContent>
        </Tooltip>
    )
}
