import { TicketStatus as TicketStatusEnum } from "@shared/enums";
import type { TicketResponseDTO } from "@shared/dtos";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useUpdateTicket } from "../hooks/useTicketActions";

interface TicketStatusProps {
  ticket: TicketResponseDTO;
  onUpdate?: (updatedTicket: TicketResponseDTO) => void;
  className?: string;
}

const statusColorMap: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.OPEN]: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-500/25",
  [TicketStatusEnum.IN_PROGRESS]: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-500/25",
  [TicketStatusEnum.RESOLVED]: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-500/25",
  [TicketStatusEnum.CLOSED]: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-500/25",
};

export function TicketStatusBadge({ ticket, onUpdate, className, ...badgeProps }: React.ComponentProps<typeof Badge> & TicketStatusProps) {
  const { isAdmin } = useAuth();

  const { mutate, loading } = useUpdateTicket({
    onSuccess: (data) => {
      onUpdate?.(data);
    },
  });

  const handleStatusChange = (newStatus: TicketStatusEnum) => {
    if (newStatus === ticket.status) return;

    mutate({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      dueAt: ticket.dueAt,
      priority: ticket.priority,
      status: newStatus,
    });
  };

  const statusLabel = ticket.status.replace(/_/g, " ");

  if (!isAdmin) {
    return (
      <Badge
        className={cn(statusColorMap[ticket.status], className)}
        variant="outline"
        {...badgeProps}
      >
        {statusLabel}
      </Badge>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={loading}>
        <Badge
          className={cn(
            "cursor-pointer gap-2",
            statusColorMap[ticket.status],
            loading && "opacity-70 cursor-wait",
            className
          )}
          variant="outline"
          {...badgeProps}
        >
          {loading && <Spinner className="size-3" />}
          {statusLabel}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {Object.values(TicketStatusEnum).map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={ticket.status === status}
          >
            {status.replace(/_/g, " ")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
