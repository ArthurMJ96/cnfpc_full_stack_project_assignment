import { Link } from "react-router-dom";
import { useTicket } from "@/features/ticket/hooks/useTicket";
import {
  useAddComment,
  useDeleteComment,
  useUpdateComment,
} from "@/features/ticket/hooks/useTicketActions";
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
import { UserAvatar } from "@/features/user/components/user-avatar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChevronsDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { TextareaSubmit } from "@/components/textarea-submit";
import { ErrorAlert } from "@/components/error-alert";
import { TicketComment } from "@/features/ticket/components/ticket-comment";

export function TicketDetails({ ticketId }: { ticketId: number }) {
  const { user, isAdmin } = useAuth();
  const { ticket, loading, refreshTicket } = useTicket(ticketId);
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
      setTimeout(scrollToBottom);
    },
  });

  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: (_res, id) => {
      refreshTicket().catch(() => {
        ticket?.comments.splice(
          ticket?.comments.findIndex((comment) => comment.id === id),
          1,
        );
      });
    },
  });

  const { mutate: updateComment } = useUpdateComment({
    onSuccess: (_res, updatedComment) => {
      refreshTicket().catch(() => {
        const index = ticket?.comments.findIndex(
          (comment) => comment.id === updatedComment.id,
        );
        if (index !== undefined && index !== -1) {
          const comment = ticket?.comments[index];
          if (comment) {
            comment.content = updatedComment.content;
            comment.edited = true;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            comment.updatedAt = new Date().toISOString();
          }
        }
      });
    },
  });

  // Determine the max comment ID on initial load for "new comment" highlighting
  const [maxInitialId, setMaxInitialId] = useState<number | null>(null);
  if (ticket && maxInitialId === null && !loading) {
    const max =
      ticket.comments.length > 0
        ? Math.max(...ticket.comments.map((c) => c.id))
        : 0;
    setMaxInitialId(max);
  }

  if (!ticket && loading) return <div>Loading...</div>;
  if (!ticket) return <div>Ticket #{ticketId} Not found</div>;

  const scrollToBottom = () => {
    anchor.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    <div className="flex justify-around gap-4 pb-50">
      <div className="w-full max-w-4xl px-4 relative">
        <div className="mt-0 sticky top-12 bg-background z-10 pt-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ticket Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Ticket ticket={ticket} className="mt-4 z-10" />
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
                  comment={c}
                  // Find comments that were added after initial load, for QOL feedback purposes
                  isNew={c.id > (maxInitialId ?? Infinity)}
                  isAdmin={isAdmin}
                  user={user!}
                  onDelete={(c) => deleteComment(c.id)}
                  onEdit={updateComment}
                />
              ))}
            <div
              ref={anchor}
              className="relative border-l-2 pl-6 sm:pl-8 ml-10 h-1 -scroll-m-72"
            />
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
                        user={user}
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
      </div>
    </div>
  );
}
