/* eslint-disable react-hooks/immutability */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonGroup } from "@/components/ui/button-group";
import { UserAvatarGroup } from "@/components/user-avatar-group";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSupports } from "@/features/user/hooks/useSupport";
import { useState } from "react";
import {
  useAssignSupport,
  useUnassignSupport,
} from "../hooks/useTicketActions";
import type { TicketResponseDTO } from "@shared/dtos";


export function TicketAssigneesMenu({ ticket }: { ticket: TicketResponseDTO }) {
  const { isSupport, isAdmin, user } = useAuth();

  const {
    supports,
    refreshSupports,
    loading: supportsLoading,
  } = useSupports({ enabled: false });
  const loadSupports = (openState: boolean) => {
    if (openState && supports.length === 0) {
      refreshSupports();
    }
  };

  const [selectedAssigneeId, setSelectedAssigneeId] = useState("");
  const { mutate: assignSupport, loading: assignSupportLoading } =
    useAssignSupport({
      onSuccess: (updatedTicket) => {
        setSelectedAssigneeId("");
        ticket.assignedTo = updatedTicket.assignedTo;
      },
    });

  const { mutate: unassignSupport, loading: unassignSupportLoading } =
    useUnassignSupport({
      onSuccess: (updatedTicket) => {
        ticket.assignedTo = updatedTicket.assignedTo;
      },
    });

  const handleAssignSupport = () => {
    if (selectedAssigneeId) {
      assignSupport(ticket.id, Number(selectedAssigneeId));
    }
  };

  const handleUnassignSupport = (supportId: number) => {
    unassignSupport(ticket.id, supportId);
  };

  const assignSelf = () => {
    if (user) {
      assignSupport(ticket.id, user.id);
    }
  };


  return (
    <DropdownMenu onOpenChange={loadSupports}>
      <DropdownMenuTrigger asChild>
        <UserAvatarGroup users={ticket.assignedTo} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" forceMount>
        <DropdownMenuLabel>Assigned Support</DropdownMenuLabel>
        <DropdownMenuGroup>
          {/* Assighnees list */}
          {ticket.assignedTo.length === 0 ? (
            <DropdownMenuLabel className="italic text-xs text-center opacity-60">
              No Assignees
            </DropdownMenuLabel>
          ) : (
            ticket.assignedTo.map((assignee, index) => (
              <DropdownMenuItem
                key={index}
                className="justify-between gap-2"
                onClick={(e) => e.preventDefault()}
              >
                <UserAvatar size="sm" key={assignee.id} user={assignee} />
                <div className="flex flex-1 flex-col">
                  <span className="text-popover-foreground">
                    {assignee.firstname} {assignee.lastname}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {assignee.jobTitle}
                  </span>
                </div>

                {(isAdmin || assignee.id === user?.id) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        className="h-7 cursor-pointer rounded-md px-2"
                        onClick={() => {
                          handleUnassignSupport(assignee.id);
                        }}
                        disabled={unassignSupportLoading}
                      >
                        <X />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="font-semibold"
                    >
                      Unassign {assignee.id === user?.id ? "myself" : ""}
                    </TooltipContent>
                  </Tooltip>
                )}
              </DropdownMenuItem>
            ))
          )}

          {/* (Admin) Add any support */}
          {(isAdmin || isSupport) &&
            user &&
            ticket.assignedTo.findIndex((v) => v.id === user.id) === -1 && (
              <DropdownMenuSeparator />
            )}
          {isAdmin && (
            <DropdownMenuItem
              className="focus:bg-transparent"
              onClick={(e) => e.preventDefault()}
            >
              <ButtonGroup className="w-full">
                <ButtonGroup className="w-full">
                  <Select
                    disabled={supportsLoading || assignSupportLoading}
                    value={selectedAssigneeId}
                    onValueChange={setSelectedAssigneeId}
                  >
                    <SelectTrigger className="w-full pl-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0">
                      <SelectValue placeholder="Assign Support" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="max-h-52 w-(--radix-select-trigger-width) [&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2"
                    >
                      <SelectGroup>
                        <SelectLabel className="pl-2">
                          Support users
                        </SelectLabel>
                        {supports
                          .filter(
                            (item1) =>
                              !ticket.assignedTo.some(
                                (item2) => item2.id === item1.id,
                              ),
                          )
                          .map((support) => (
                            <SelectItem
                              key={support.id}
                              value={support.id.toString()}
                            >
                              <UserAvatar
                                size="sm"
                                key={support.id}
                                user={support}
                                className="size-5"
                              />
                              <span className="truncate">
                                {support.firstname} {support.lastname}
                              </span>
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={supportsLoading || assignSupportLoading}
                    onClick={handleAssignSupport}
                  >
                    {assignSupportLoading ? <Spinner /> : <PlusIcon />}
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            </DropdownMenuItem>
          )}

          {/* (Support) Assign self */}
          {isSupport &&
            !isAdmin &&
            user &&
            ticket.assignedTo.findIndex((v) => v.id === user.id) === -1 && (
              <DropdownMenuItem
                className="focus:bg-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  assignSelf();
                }}
              >
                <Button
                  variant="outline"
                  className="grow"
                  disabled={assignSupportLoading}
                >
                  Assign Myself
                  <div className="absolute right-4">
                    {assignSupportLoading ? <Spinner /> : <PlusIcon />}
                  </div>
                </Button>
              </DropdownMenuItem>
            )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}