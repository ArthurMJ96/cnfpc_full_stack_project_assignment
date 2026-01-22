import { AdminTicketTable } from '@/features/ticket/components/dashboard/admin-ticket-table';

export default function AdminHome() {
    return (
        <div className="container flex mx-auto p-4 overflow-hidden h-[calc(100vh-4rem)]">
            <AdminTicketTable />
        </div>
    );
}