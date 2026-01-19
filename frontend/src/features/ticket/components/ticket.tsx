import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TicketPriority } from "@shared/enums"
import type { TicketResponseDTO } from "@shared/dtos"
import { CalendarIcon, MessageSquareIcon, ClockIcon } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { UserAvatar } from "@/components/user-avatar"

type PriorityVariant = "default" | "secondary" | "destructive" | "outline"

interface TicketProps {
    data: TicketResponseDTO
    onClick?: () => void
}

export function Ticket({ data, onClick }: TicketProps) {
    const { isAdmin, isSupport } = useAuth();
    const priorityColor = {
        [TicketPriority.LOW]: "secondary",
        [TicketPriority.MEDIUM]: "outline",
        [TicketPriority.HIGH]: "default",
        [TicketPriority.URGENT]: "destructive",
    } as const

    return (
        <Card size="sm" className={"hover:bg-muted/5 transition-all group" + (onClick ? " cursor-pointer" : "")} onClick={onClick}>
            <CardHeader className="border-b bg-muted/5">

                <CardDescription className="flex gap-2">
                    <span className="line-clamp-1">
                        {isAdmin && `#${data.id} • `}{new Date(data.createdAt).toLocaleDateString()}
                    </span>
                </CardDescription>
                <CardTitle className="line-clamp-1 mr-2 text-lg" title={data.title}>
                    {data.title}
                </CardTitle>
                <CardAction>

                    <Badge variant="outline" className="flex items-center gap-2 px-2 py-1 pl-1.5 h-auto rounded-md">
                        <UserAvatar firstname={data.author.firstname} lastname={data.author.lastname} />
                        <div className="flex flex-col gap-0.5 mr-auto justify-around">
                            <span className="text-xs font-medium leading-none">{data.author.firstname} {data.author.lastname}</span>
                            <span className="text-[10px] text-muted-foreground leading-none">{data.author.jobTitle}</span>
                        </div>
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground line-clamp-2 min-h-[2.5em] text-sm">
                    {data.description}
                </p>
            </CardContent>
            <CardFooter className="border-t bg-muted/5 pt-3 mt-auto">
                <div className="flex items-center gap-3 w-full">
                    <Badge variant="outline" className="text-[10px] px-1.5 h-5 font-normal">
                        <span className="sr-only">Status:</span>{data.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground ml-1">
                        <MessageSquareIcon className="size-3.5" />
                        <span className="text-xs">{data.commentCount}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <CalendarIcon className="size-3.5" />
                            <span>Updated {new Date(data.updatedAt).toLocaleDateString()}</span>
                        </div>
                        {data.dueAt && (
                            <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-medium">
                                <ClockIcon className="size-3.5" />
                                <span>Due {new Date(data.dueAt).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
                {isSupport && <Tooltip>
                    <TooltipTrigger asChild>
                        <Badge variant={priorityColor[data.priority] as PriorityVariant}>
                            {data.priority}
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent align="center" side="left">
                        <p>Priority Status</p>
                    </TooltipContent>
                </Tooltip>}
            </CardFooter>
        </Card>
    )
}
