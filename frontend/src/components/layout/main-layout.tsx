import { Outlet } from "react-router-dom"
import { NavBar } from "./navbar"

export function MainLayout() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
