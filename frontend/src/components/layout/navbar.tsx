import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserMenu } from "@/features/user/components/user-menu";

export function NavBar() {
  const { isAuthenticated, isAdmin, isSupport, isAuthor } = useAuth();

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
                <NavLink
                  to="/support"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Support Dashboard
                </NavLink>
              )}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="transition-colors hover:text-foreground/80 text-foreground/60 "
                >
                  Admin Console
                </NavLink>
              )}
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
            {isAuthor && (
              <Button variant="default" asChild>
                <NavLink to="/ticket/create">Create Ticket</NavLink>
              </Button>
            )}
            <UserMenu />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
