import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTickets } from "@/features/ticket/hooks/useTickets";
import { useCreateTicket } from "@/features/ticket/hooks/useTicketActions";
import { Ticket } from "@/features/ticket/components/ticket";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { CreateTicketRequestDTO, TicketResponseDTO } from "@shared/dtos";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorAlert } from "@/components/error-alert";

export function TicketForm({
  onSubmit,
}: {
  onSubmit?: (ticket: TicketResponseDTO) => void;
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [withDueDate, setWithDueDate] = useState(false);
  const [dueAt, setDueAt] = useState("");

  const {
    mutate: createTicket,
    loading: ticketCreationLoading,
    error: ticketCreationError,
  } = useCreateTicket({
    onSuccess: (ticket) => {
      setTitle("");
      setDescription("");
      setDueAt("");
      onSubmit?.(ticket);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      description,
      authorId: user!.id,
      ...(withDueDate ? { dueAt: new Date(dueAt) } : {}),
    } as CreateTicketRequestDTO;
    console.log(data);
    await createTicket(data);
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Ticket</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {ticketCreationError && <ErrorAlert error={ticketCreationError} />}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ticket title"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue..."
                  required
                />
              </Field>
              <Field>
                <Field orientation="horizontal">
                  <Checkbox
                    id="terms-checkbox"
                    name="withDueDate"
                    checked={withDueDate}
                    onCheckedChange={(c) => setWithDueDate(!!c)}
                  />
                  <FieldLabel htmlFor="terms-checkbox">
                    With Due Date
                  </FieldLabel>
                </Field>
                <Input
                  id="dueAt"
                  name="dueAt"
                  disabled={!withDueDate}
                  type="datetime-local"
                  value={dueAt}
                  onChange={(e) => setDueAt(e.target.value)}
                  required={withDueDate}
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-5">
            <Button
              type="submit"
              disabled={ticketCreationLoading}
              className="w-full"
            >
              {ticketCreationLoading ? (
                <Spinner className="mr-2 h-4 w-4" />
              ) : null}
              Create Ticket
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
