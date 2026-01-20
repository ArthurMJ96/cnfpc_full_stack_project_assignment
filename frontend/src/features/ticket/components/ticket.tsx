import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketPriority } from "@shared/enums";
import type { TicketResponseDTO } from "@shared/dtos";
import { CalendarIcon, MessageSquareIcon, ClockIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserAvatar } from "@/components/user-avatar";
import { getRelativeTime } from "@/lib/utils";

type PriorityVariant = "default" | "secondary" | "destructive" | "outline";

interface TicketProps {
  data: TicketResponseDTO;
  onClick?: () => void;
}

export function Ticket({
  data,
  onClick,
  ...props
}: React.ComponentProps<"div"> & TicketProps) {
  const { isSupport } = useAuth();
  const priorityColor = {
    [TicketPriority.LOW]: "secondary",
    [TicketPriority.MEDIUM]: "outline",
    [TicketPriority.HIGH]: "default",
    [TicketPriority.URGENT]: "destructive",
  } as const;

  return (
    <Card
      size="sm"
      className={
        "group" +
        (onClick ? "hover:bg-muted/5 transition-all cursor-pointer" : "")
      }
      onClick={onClick}
      {...props}
    >
      <CardHeader className="border-b bg-muted/5">
        <CardDescription className="flex gap-2 items-center align-middle *:text-[0.6rem]! -mt-1">
          <Badge
            variant="ghost"
            className="flex items-center gap-1 -ml-0.5 -mr-2 px-0.5 h-auto rounded-md group"
          >
            <UserAvatar
              size="sm"
              className="after:border-0 group-hover:after:border items-center align-middle *:text-[0.5rem]!"
              firstname={data.author.firstname}
              lastname={data.author.lastname}
            />
            <h3 className="font-semibold tracking-[-0.01em] text-xs">
              {data.author.firstname} {data.author.lastname}
            </h3>
          </Badge>
          <span className="text-xs align-bottom">{`• ${data.author.jobTitle}`}</span>
          <Tooltip>
            <TooltipTrigger>
              {getRelativeTime(new Date(data.createdAt).getTime())}
            </TooltipTrigger>
            <TooltipContent side="right">
              {new Date(data.createdAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </TooltipContent>
          </Tooltip>
        </CardDescription>

        <CardTitle className="line-clamp-1 mr-2 text-lg" title={data.title}>
          {data.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-2 min-h-[2.5em] text-sm">
          {data.description}
        </p>
      </CardContent>

      <CardFooter className="border-t bg-muted/5 pt-3 mt-auto">
        <div className="flex items-center gap-3 w-full">
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 h-5 font-normal"
          >
            <span className="sr-only">Status:</span>
            {data.status.replace("_", " ")}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground ml-1">
            <MessageSquareIcon className="size-3.5" />
            <span className="text-xs">{data.commentCount}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              <span>
                Updated {new Date(data.updatedAt).toLocaleDateString()}
              </span>
            </div>
            {data.dueAt && (
              <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-medium">
                <ClockIcon className="size-3.5" />
                <span>Due {new Date(data.dueAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Priority Badge (SUPPORT ONLY) */}
        {isSupport && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant={priorityColor[data.priority] as PriorityVariant}
                className="font-semibold"
              >
                {data.priority}
              </Badge>
            </TooltipTrigger>
            <TooltipContent align="center" side="left">
              <p>Priority Status</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
}
