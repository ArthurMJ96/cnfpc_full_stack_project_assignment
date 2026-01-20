import { useParams } from "react-router-dom";
import { useTicket } from "@/features/ticket/hooks/useTicket";
import { useAddComment } from "@/features/ticket/hooks/useTicketActions";
import { Ticket } from "@/features/ticket/components/ticket";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { Card } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/utils";
import type { TicketCommentResponseDTO } from "@shared/dtos";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChevronsDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { TextareaSubmit } from "@/components/textarea-submit";
import ErrorAlert from "@/components/error-alert";

export function TicketDetailsPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const { ticket, loading, refreshTicket } = useTicket(Number(id));
  const [commentText, setCommentText] = useState("");
  const anchor = useRef<HTMLDivElement>(null);
  const {
    mutate: addComment,
    loading: addCommentLoading,
    error: addCommentError,
    flushError: dismissCommentError,
  } = useAddComment({
    onSuccess: (comment) => {
      refreshTicket().catch(() => ticket?.comments.push(comment));
      setCommentText("");
      setTimeout(() => {
        scrollToBottom();
      });
    },
  });

  const [maxInitialId, setMaxInitialId] = useState<number>(-1);
  useEffect(() => {
    if (ticket && maxInitialId === -1) {
      const max =
        ticket.comments.length > 0
          ? Math.max(...ticket.comments.map((c) => c.id))
          : 0;
      setMaxInitialId(max);
    }
  }, [ticket, maxInitialId]);

  if (!ticket && loading) return <div>Loading...</div>;
  if (!ticket) return <div>Ticket #{id} Not found</div>;

  const scrollToBottom = () => {
    anchor.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (commentText.trim() === "") return;
    if (!user?.id) return;
    addComment({
      authorId: user?.id,
      content: commentText,
      ticketId: ticket.id,
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-50">
      <div className="grid grid-cols-[auto_360px] gap-10 relative">
        <div>
          <div className="mt-0 sticky top-12 bg-background z-10 pt-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Ticket Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Ticket data={ticket} className="mt-4 z-10" />
            <div className="absolute w-full h-12 -bottom-12 left-0 -z-10 pointer-events-none bg-linear-to-b from-background to-transparent opacity-0 [animation-timeline:scroll()] [animation-range:0px_50px] fill-mode-[both] [animation-name:fade-in]"></div>
          </div>

          {/* Ticket Comments */}
          <div className="flex flex-col gap-2 mt-px">
            <div className="relative">
              <div className="relative pb-4 border-l-2 pl-6 sm:pl-8 ml-10 h-4" />
              {/* Sort comments by creation date */}
              {ticket.comments
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
                )
                .map((c) => (
                  <TicketComment
                    key={c.id}
                    {...c}
                    // Find comments that were added after initial load, for QOL feedback purposes
                    isNew={c.id > maxInitialId}
                  />
                ))}
            </div>
          </div>

          {/* Comment Form */}
          {!user ? (
            <Separator />
          ) : (
            <>
              <div className="relative pb-4 border-l-2 pl-6 sm:pl-8 ml-10 h-12" />
              <div className="mb-10 sticky bottom-0 pb-5 @container-[scroll-state]">
                <form onSubmit={handleSubmit}>
                  <div className="group relative rounded-lg transition-all -mt-12">
                    <div className="flex flex-wrap items-start">
                      <div className="absolute w-full -top-5 h-12 pointer-events-none bg-linear-to-b from-transparent  [@container_scroll-state(stuck:bottom)]:to-background" />
                      <div className="absolute w-full top-6 h-full bg-background" />
                      <div className="absolute -top-10 h-12 w-full justify-center items-center hidden [@container_scroll-state(stuck:bottom)]:flex">
                        <Button
                          variant="outline"
                          className="bg-background!"
                          type="button"
                          onClick={scrollToBottom}
                        >
                          <ChevronsDown />
                          Scroll down
                        </Button>
                      </div>
                      <div className="relative pb-4 border-l-2 border-transparent group-last:pb-10 pl-6 sm:pl-8 space-y-2 ml-10 w-full max-w-2xl">
                        <UserAvatar
                          className="absolute -translate-x-1/2 -left-px top-6 ring-0! border-0!"
                          firstname={user.firstname}
                          lastname={user.lastname}
                        />
                        <h3 className="mt-6 font-semibold tracking-[-0.01em] text-sm">
                          {user.firstname} {user.lastname}
                        </h3>
                        <TextareaSubmit
                          className="w-full"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          name="comment"
                          onEnterPress={handleSubmit}
                          loading={addCommentLoading}
                        />
                        {addCommentError && (
                          <div className="relative">
                            <ErrorAlert error={addCommentError} />
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              type="button"
                              className="absolute top-1.5 right-2"
                              onClick={dismissCommentError}
                            >
                              <X />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
          <div ref={anchor}></div>
        </div>

        <div className="relative">
          <Card className="sticky top-18 min-h-125"></Card>
        </div>
      </div>
    </div>
  );
}

function TicketComment({
  author,
  content,
  createdAt,
  edited,
  isNew,
}: TicketCommentResponseDTO & { isNew?: boolean }) {
  return (
    <div
      className={
        "group relative hover:bg-muted/80 rounded-lg transition-all" +
        (isNew ? " animate-flash-muted" : "")
      }
    >
      <div className="flex items-start">
        <div className="relative pb-4 border-l-2 group-last:pb-10 pl-6 sm:pl-8 space-y-2 ml-10">
          {/* User as Timeline Dot */}
          <UserAvatar
            className="absolute -translate-x-1/2 -left-px top-6"
            firstname={author.firstname}
            lastname={author.lastname}
          />

          {/* Content */}
          <h3 className="mt-6 font-semibold tracking-[-0.01em] text-sm">
            {author.firstname} {author.lastname}
          </h3>

          <h3 className="text-xs text-muted-foreground font-normal tracking-[-0.01em]">
            <Tooltip>
              <TooltipTrigger>
                {getRelativeTime(new Date(createdAt).getTime())}
              </TooltipTrigger>
              <TooltipContent side="right">
                {new Date(createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </TooltipContent>
            </Tooltip>
            {edited && (
              <span className="italic text-muted-foreground"> (edited)</span>
            )}
            <span className="select-none">{` • ${author.jobTitle}`}</span>
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground pl-5 pr-1">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
