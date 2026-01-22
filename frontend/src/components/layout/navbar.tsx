import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserMenu } from "@/features/user/components/user-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function NavBar() {
  const { isAdmin, isSupport } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <div className="mr-8 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block">
              Service Desk
            </span>
            <span className="inline-block font-bold sm:hidden">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto ml-2" />
            </span>
          </Link>
          {isAdmin && (
            <div className="flex items-center space-x-6 text-sm font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none">
                  Admin <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/users">Users</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/users/create">Create User</Link>
                  </DropdownMenuItem>
                  {isSupport && isAdmin && <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/support">Support Dashboard</Link>
                    </DropdownMenuItem>
                  </>}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2 pr-1">
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}
