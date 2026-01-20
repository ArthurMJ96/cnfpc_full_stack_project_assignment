import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserAvatar } from "@/components/user-avatar";
import { getRelativeTime } from "@/lib/utils";
import { SquarePen, X } from "lucide-react";
import type { TicketCommentResponseDTO } from "@shared/dtos";
import { TextareaSubmit } from "@/components/textarea-submit";
import { useState } from "react";

export function TicketComment({
  comment,
  isNew,
  isAdmin,
  user,
  onDelete,
  onEdit,
}: {
  comment: TicketCommentResponseDTO;
  isNew?: boolean;
  isAdmin?: boolean;
  user?: { id: number };
  onEdit?: (content: TicketCommentResponseDTO) => void;
  onDelete?: (comment: TicketCommentResponseDTO) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedContent(comment.content);
  };
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    onEdit?.({ ...comment, content: editedContent });
    setIsEditing(false);
  };
  return (
    <div
      className={
        "group relative hover:bg-muted/80 rounded-lg transition-all" +
        (isNew ? " animate-flash-muted" : "") +
        (comment.deleted
          ? " after:bg-destructive/5 dark:after:bg-destructive/10 after:content-[''] after:absolute after:inset-1 after:rounded-lg"
          : "")
      }
    >
      {comment.deleted && (
        <div className="absolute right-3 top-2 text-xs italic font-semibold text-destructive">
          Deleted
        </div>
      )}
      <div className="flex items-start w-full pr-24">
        <div className="relative pb-4 border-l-2 group-last:pb-10 pl-6 sm:pl-8 space-y-2 ml-10 w-full">
          {/* User as Timeline Dot */}
          <UserAvatar
            className="absolute -translate-x-1/2 -left-px top-6"
            firstname={comment.author.firstname}
            lastname={comment.author.lastname}
          />

          {/* Content */}
          <h3 className="mt-6 font-semibold tracking-[-0.01em] text-sm">
            {comment.author.firstname} {comment.author.lastname}
          </h3>

          <h3 className="text-xs text-muted-foreground font-normal tracking-[-0.01em]">
            <Tooltip>
              <TooltipTrigger>
                {getRelativeTime(new Date(comment.updatedAt).getTime())}
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="flex flex-col">
                  {comment.edited ? (
                    <>
                      <span>
                        Created:{" "}
                        {new Date(comment.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      <span>
                        Updated:{" "}
                        {new Date(comment.updatedAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {new Date(comment.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
            {comment.edited && (
              <span className="italic text-muted-foreground"> (edited)</span>
            )}
            <span className="select-none">{` • ${comment.author.jobTitle}`}</span>
          </h3>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <TextareaSubmit
                className="w-full"
                textareaClassName="min-h-4"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onEnterPress={handleSubmit}
                name="commentEdit"
              />
            </form>
          ) : (
            <p className="text-sm sm:text-base text-muted-foreground pl-5 pr-1">
              {comment.content}
            </p>
          )}
        </div>
        <div className="absolute bottom-2 right-2 text-xs w-24 flex justify-end gap-1">
          {(isAdmin || comment.author.id === user?.id) && !comment.deleted && (
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete comment</TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete{" "}
                    {comment.author.id === user?.id ? "your" : "this"} comment.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete?.(comment)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {comment.author.id === user?.id && !comment.deleted && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-sky-700/20! text-sky-700"
                  onClick={toggleEdit}
                >
                  <SquarePen />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit comment</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}
