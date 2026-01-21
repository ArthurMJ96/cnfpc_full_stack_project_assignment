import { useAuth } from "@/features/auth/hooks/useAuth";
import AuthorHome from "@/pages/home/author-home";
import { AssignedTicketsColumn } from "@/features/ticket/components/dashboard/assigned-tickets-column";
import { AdminTicketTable } from "@/features/ticket/components/dashboard/admin-ticket-table";
import SupportHome from "./home/support-home";

export default function Home() {
  const { user, isSupport, isAdmin } = useAuth();

  if (!user) return null;

  if (isAdmin) {
    if (isSupport) {
      return (
        <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 justify-start">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <AssignedTicketsColumn />
          </div>
          <AdminTicketTable />
        </div>
      );
    } else {
      return (
        <div className="container mx-auto p-4 h-[calc(100vh-50rem)]!">
          <AdminTicketTable />
        </div>
      );
    }
  }

  if (isSupport) {
    return (
      <SupportHome />
    );
  }

  return <AuthorHome />;
}
