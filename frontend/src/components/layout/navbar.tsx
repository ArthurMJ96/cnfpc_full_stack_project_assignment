import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function NavBar() {
  const { isAuthenticated, isAdmin, isSupport, isAuthor, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <div className="mr-8 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block">
              Service Desk
            </span>
          </Link>
          {isAuthenticated && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {isSupport && isAdmin && (
                <Link
                  to="/support"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Support Dashboard
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Admin Console
                </Link>
              )}
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
            {isAuthor && (
              <Button variant="default" asChild>
                <Link to="/ticket/create">Create Ticket</Link>
              </Button>
            )}
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
