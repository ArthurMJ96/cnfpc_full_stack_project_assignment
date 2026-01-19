import { useState, useEffect, useCallback } from 'react';
import { ticketApi } from '../api';
import type { TicketResponseDTO } from '@shared/dtos';

export const useTickets = () => {
    const [tickets, setTickets] = useState<TicketResponseDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ticketApi.getAll();
            if (data) {
                setTickets(data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
        } finally {
            setLoading(false);
        }
    }, []
    );

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    return { tickets, loading, error, refreshTickets: fetchTickets };
};
