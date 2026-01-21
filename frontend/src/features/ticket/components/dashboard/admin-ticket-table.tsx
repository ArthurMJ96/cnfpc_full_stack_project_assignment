import { useTickets } from "@/features/ticket/hooks/useTickets";
import { TicketStatus } from "@shared/enums";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TicketPriorityBadge } from "../ticket-priority-badge";
import { TicketAssigneesMenu } from "../ticket-assignees-menu";
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";

export function AdminTicketTable({ className }: { className?: string }) {
    const { tickets, loading } = useTickets();

    if (loading)
    return (
        <div className={cn('h-full w-full flex flex-col gap-4', className)}>
            <div className="flex items-center justify-between p-2 rounded-md bg-background/50 backdrop-blur-sm">
                <h2 className="text-lg font-bold">All Tickets Overview</h2>
            </div>
            <div className="relative flex flex-col gap-4 after:contents before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:via-background before:to-background before:z-10">
                {Array.from({ length: 16 }).map((_, index) => (
                    <div className="flex gap-4" key={index}>
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-20" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={`h-full w-full flex flex-col gap-4 ${className}`}>
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
                                        <div className="flex justify-end">
                                            <TicketAssigneesMenu ticket={ticket} />
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
