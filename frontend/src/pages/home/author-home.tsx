
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTickets } from '@/features/ticket/hooks/useTickets';
import { useCreateTicket } from '@/features/ticket/hooks/useTicketActions';
import { Ticket } from '@/features/ticket/components/ticket';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type { CreateTicketRequestDTO } from '@shared/dtos';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [withDueDate, setWithDueDate] = useState(false);
    const [dueAt, setDueAt] = useState("");

    const navigate = useNavigate();

    const { tickets, loading: loadingTickets, refreshTickets } = useTickets();

    const { mutate: createTicket, loading: creatingTicket } = useCreateTicket({
        onSuccess: () => {
            setTitle("");
            setDescription("");
            setDueAt("");
            refreshTickets();
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !title || !description) return;

        const newTicket: Partial<CreateTicketRequestDTO> = {
            title,
            description,
            authorId: user.id,
            ...(withDueDate ? { dueAt: new Date(dueAt) } : {}),
        };
        createTicket(newTicket as CreateTicketRequestDTO);
    }

    const myTickets = tickets?.filter(t => t.author.id === user?.id) || [];

    return (
        <div className="container max-w-2xl mx-auto p-4 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Ticket</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input
                                    id="title"
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the issue..."
                                    required
                                />
                            </Field>
                            <Field>
                                <Field orientation="horizontal">
                                    <Checkbox id="terms-checkbox" checked={withDueDate} onCheckedChange={(c) => setWithDueDate(!!c)} />
                                    <FieldLabel htmlFor="terms-checkbox">With Due Date</FieldLabel>
                                </Field>
                                <Input
                                    id="dueAt"
                                    disabled={!withDueDate}
                                    type="datetime-local"
                                    value={dueAt}
                                    onChange={(e) => setDueAt(e.target.value)}
                                />
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className='mt-5'>
                        <Button type="submit" disabled={creatingTicket} className="w-full">
                            {creatingTicket ? <Spinner className="mr-2 h-4 w-4" /> : null}
                            Create Ticket
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Tickets</h2>
                {loadingTickets ? (
                    <div className="flex justify-center p-4">
                        <Spinner className="h-8 w-8" />
                    </div>
                ) : myTickets.length > 0 ? (
                    myTickets.map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} />
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8 border rounded-lg border-dashed">
                        No tickets found. Create one above!
                    </div>
                )}
            </div>
        </div>
    );
}