
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { TicketResponseDTO } from "@shared/dtos";
import { CalendarIcon, MessageSquareIcon, ClockIcon, } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserAvatar } from "@/features/user/components/user-avatar";
import { getRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TicketPriorityBadge } from "./ticket-priority-badge";
import { TicketAssigneesMenu } from "./ticket-assignees-menu";


export function Ticket({ ticket, ...props }: React.ComponentProps<"div"> & { ticket: TicketResponseDTO; }) {
    const { isSupport } = useAuth();

    return (
        <Card size="sm" className="group" {...props}>
            <CardHeader className="border-b bg-muted/5">
                <CardDescription className="flex gap-2 items-center align-middle *:text-[0.6rem]! -mt-1 relative">
                    <Badge
                        variant="ghost"
                        className="flex items-center gap-1 -ml-0.5 -mr-2 px-0.5 h-auto rounded-md group"
                    >
                        <UserAvatar
                            size="sm"
                            className="after:border-0 group-hover:after:border items-center align-middle *:text-[0.5rem]!"
                            user={ticket.author}
                        />
                        <h3 className="font-semibold tracking-[-0.01em] text-xs">
                            {ticket.author.firstname} {ticket.author.lastname}
                        </h3>
                    </Badge>
                    <span className="text-xs align-bottom">{`• ${ticket.author.jobTitle}`}</span>
                    <Tooltip>
                        <TooltipTrigger>
                            {getRelativeTime(new Date(ticket.createdAt).getTime())}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {new Date(ticket.createdAt).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </TooltipContent>
                    </Tooltip>

                    {/* Priority Badge (SUPPORT ONLY) */}
                    {isSupport && (
                        <div className="absolute top-0 right-0">
                            <TicketPriorityBadge ticket={ticket} />
                        </div>
                    )}
                </CardDescription>

                <CardTitle className="line-clamp-1 mr-2 text-lg" title={ticket.title}>
                    {ticket.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground line-clamp-2 min-h-[2.5em] text-sm">
                    {ticket.description}
                </p>
            </CardContent>

            <CardFooter className="border-t bg-muted/5 pt-3 mt-auto gap-4">
                <div className="flex items-center gap-3 w-full">
                    <Badge variant="outline" className="font-semibold px-1.5">
                        <span className="sr-only">Status:</span>
                        {ticket.status.replace("_", " ")}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground ml-1">
                        <Button variant="ghost" className="rounded-full" asChild>
                            <Link to={`/ticket/${ticket.id}`}>
                                <MessageSquareIcon className="size-3.5" />
                                <span className="text-xs">{ticket.commentCount}</span>
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        {ticket.updatedAt !== ticket.createdAt && (
                            <div className="flex items-center gap-1.5">
                                <CalendarIcon className="size-3.5" />
                                <span>
                                    Updated {new Date(ticket.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                        {ticket.dueAt && (
                            <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-medium">
                                <ClockIcon className="size-3.5" />
                                <span>Due {new Date(ticket.dueAt).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Assignees Menu */}
                <TicketAssigneesMenu ticket={ticket} />
            </CardFooter>
        </Card>
    );
}
