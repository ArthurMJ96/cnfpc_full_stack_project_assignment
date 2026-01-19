import { useState, useEffect, useCallback } from 'react';
import { ticketApi } from '../api';
import type { TicketResponseDTO } from '@shared/dtos';

export const useTicket = (id: number | undefined) => {
    const [ticket, setTicket] = useState<TicketResponseDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTicket = useCallback(async () => {
        if (id === undefined) return;
        
        setLoading(true);
        setError(null);
        try {
            const data = await ticketApi.getById(id);
            setTicket(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch ticket');
            setTicket(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTicket();
    }, [fetchTicket]);

    return { ticket, loading, error, refreshTicket: fetchTicket };
};
