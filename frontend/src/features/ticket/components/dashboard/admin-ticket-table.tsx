import { useTickets } from "@/features/ticket/hooks/useTickets";
import { TicketStatus } from "@shared/enums";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { UserAvatar } from "@/components/user-avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserAvatarGroup } from "@/components/user-avatar-group";
import { TicketPriorityBadge } from "../ticket-priority-badge";

export function AdminTicketTable({ className }: { className?: string }) {
    const { tickets, loading } = useTickets();

    if (loading)
        return (
            <div className="flex justify-center p-4">
                <Spinner />
            </div>
        );

    return (
        <div className={`h-full w-full flex flex-col space-y-4 ${className}`}>
            <div className="flex items-center justify-between p-2 rounded-md bg-background/50 backdrop-blur-sm">
                <h2 className="text-lg font-bold">All Tickets Overview</h2>
                <div className="text-sm text-muted-foreground">
                    Total: {tickets.length}
                </div>
            </div>
            <div className="flex-1 border rounded-lg bg-card overflow-hidden">
                <ScrollArea className="h-full w-full">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground font-medium border-b sticky top-0 z-10">
                            <tr>
                                <th className="p-3 w-12.5">ID</th>
                                <th className="p-3 w-30">Status</th>
                                <th className="p-3 w-25">Priority</th>
                                <th className="p-3">Title</th>
                                <th className="p-3 w-37.5">Author</th>
                                <th className="p-3 w-30">Assigned</th>
                                <th className="p-3 w-25">Due</th>
                                <th className="p-3 w-25"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {tickets.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="hover:bg-muted/50 transition-colors group"
                                >
                                    <td className="p-3 font-mono text-xs">#{ticket.id}</td>
                                    <td className="p-3">
                                        <Badge
                                            variant={
                                                ticket.status === TicketStatus.OPEN
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="text-xs"
                                        >
                                            {ticket.status}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <TicketPriorityBadge ticket={ticket} side="right" />
                                    </td>
                                    <td
                                        className="p-3 font-medium truncate max-w-50"
                                        title={ticket.title}
                                    >
                                        {ticket.title}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <UserAvatar user={ticket.author} className="h-6 w-6" />
                                            <span className="truncate max-w-25 text-xs">
                                                {ticket.author.lastname}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex -space-x-2">
                                            <UserAvatarGroup users={ticket.assignedTo} />
                                        </div>
                                    </td>
                                    <td className="p-3 text-xs text-muted-foreground">
                                        {ticket.dueAt
                                            ? new Date(ticket.dueAt).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td>
                                        <Button asChild variant="link">
                                            <Link to={`/ticket/${ticket.id}`}>View</Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
