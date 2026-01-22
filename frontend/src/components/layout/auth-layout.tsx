import { GalleryVerticalEnd } from "lucide-react"
import { Link, Outlet } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

export function AuthLayout() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        IT Service Desk
                    </Link>

                    <div className="ml-auto">
                        <ThemeToggle className="size-12" asIcon />
                    </div>
                </div>
                <Outlet />
            </div>
            <div className="bg-muted relative hidden lg:block">
                <div className="absolute inset-0 w-full h-full grid place-items-center">
                    <img
                        src="/head.png"
                        alt="Image"
                        className=" object-contain object-center h-3/5 dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </div>
    )
}
