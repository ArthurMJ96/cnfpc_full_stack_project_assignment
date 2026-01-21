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
import { UserAvatar } from "@/features/user/components/user-avatar";
import { getRelativeTime } from "@/lib/utils";
import { Pencil, PencilOff, X } from "lucide-react";
import type { TicketCommentResponseDTO } from "@shared/dtos";
import { TextareaButton, TextareaSubmit } from "@/components/textarea-submit";
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
        <div className="relative pb-2 border-l-2 group-last:pb-10 pl-6 sm:pl-8 space-y-2 ml-10 w-full">
          {/* User as Timeline Dot */}
          <UserAvatar
            className="absolute -translate-x-1/2 -left-px top-6"
            user={comment.author}
          />

          {/* Comment Details */}
          <h3 className="mt-8 font-semibold tracking-[-0.01em] text-sm">
            {comment.author.firstname} {comment.author.lastname}
            <span className="select-none text-xs text-muted-foreground font-normal tracking-[-0.01em]">{` • ${comment.author.jobTitle}`}</span>
          </h3>
          <h3 className=" text-xs text-muted-foreground font-normal tracking-[-0.01em]">
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
          </h3>

          {/* Comment Content or Edit Form */}
          {!comment.deleted && isEditing ? (
            <form onSubmit={handleSubmit}>
              <TextareaSubmit
                className="w-full"
                textareaClassName="min-h-4"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onEnterPress={handleSubmit}
                name="commentEdit"
              >
                <TextareaButton
                  variant="outline"
                  type="button"
                  size="sm"
                  onClick={toggleEdit}
                >
                  Cancel
                </TextareaButton>
              </TextareaSubmit>
            </form>
          ) : (
            <p className="text-sm sm:text-base text-muted-foreground pl-0 pr-1">
              {comment.content}
            </p>
          )}
        </div>
        <div className="absolute bottom-2 right-2 text-xs w-24 flex justify-end gap-1">

          {comment.author.id === user?.id && !comment.deleted && (
            // Edit Button
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon-lg"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-sky-700/10! hover:bg-sky-700/20! text-sky-700"
                  onClick={toggleEdit}
                >
                  {isEditing ? <PencilOff /> : <Pencil />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit comment</TooltipContent>
            </Tooltip>
          )}

          {(isAdmin || comment.author.id === user?.id) && !comment.deleted && (
            // Delete Button with Confirmation Dialog
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon-lg"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X />
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
                  <AlertDialogCancel className="border-0">Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => onDelete?.(comment)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
