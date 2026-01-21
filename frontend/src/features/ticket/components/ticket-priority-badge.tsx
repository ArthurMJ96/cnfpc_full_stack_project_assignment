import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TicketPriority } from '@shared/enums';
import { Sparkle } from "lucide-react";
import type { TicketResponseDTO } from '@shared/dtos';

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
            <TooltipContent align="center" side={side} className='text-center flex flex-col gap-1'>
                <div>Priority Status</div>
                {ticket.sentiment && (
                    <div className='flex items-center justify-center gap-1'>
                        <Sparkle className='size-3.5 inline-block align-middle' fill='currentColor' />
                        <div className='leading-0'>Detected sentiment: {ticket.sentiment}</div>
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    )
}
