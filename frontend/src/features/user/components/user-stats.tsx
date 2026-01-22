import React, { useEffect, useState } from "react";
import { userApi } from "@/features/user/api";
import type { UserStatsResponseDTO } from "@shared/dtos";
import { Spinner } from "@/components/ui/spinner";
import { ErrorAlert } from "@/components/error-alert";
import { StatisticsCard } from "@/components/statistics-card";
import { Briefcase, CheckCircle2, MessageSquare, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserStats({ userId, className, ...props }: { userId: number } & React.ComponentProps<'div'>) {

    const [stats, setStats] = useState<UserStatsResponseDTO>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined | unknown>();

    useEffect(() => {
        if (isNaN(userId)) {
            setError(new Error("Invalid user ID"));
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const statsData = await userApi.getUserStats(userId);
                setStats(statsData);
            } catch (err: unknown) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (!stats || loading) return <div className="flex justify-center p-8"><Spinner /></div>;

    if (error) return <ErrorAlert error={error} className="m-4" />;

    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)} {...props}>
            <StatisticsCard
                icon={<Briefcase />}
                title="Assigned Tickets"
                value={stats.assignedTickets.toString()}
            />
            <StatisticsCard
                icon={<CheckCircle2 />}
                title="Resolved Tickets"
                value={stats.resolvedAssignedTickets.toString()}
            />
            <StatisticsCard
                icon={<PlusCircle />}
                title="Created Tickets"
                value={stats.createdTickets.toString()}
            />
            <StatisticsCard
                icon={<MessageSquare />}
                title="Total Comments"
                value={stats.totalComments.toString()}
            />
        </div>
    );
}
