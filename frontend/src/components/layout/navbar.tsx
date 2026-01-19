import { Link } from "react-router-dom"
import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "../ui/button"

export function NavBar() {
    return (

        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 items-center mx-auto">
                <div className="mr-4 hidden md:flex">
                    <Link className="mr-6 flex items-center space-x-2" to="/">
                        <span className="hidden font-bold sm:inline-block">
                            Service Desk
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                            to="#/tickets"
                        >
                            Tickets
                        </Link>
                        <Link
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                            to="#/users"
                        >
                            Users
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* <CommandMenu /> */}

                    </div>
                    <nav className="flex items-center gap-2">
                        <Button variant="link" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}