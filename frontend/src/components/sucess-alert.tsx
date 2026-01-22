import { Check } from "lucide-react"
import { cn } from "@/lib/utils";

export function SuccessAlert({ message, className, ...props }: { message: string } & React.ComponentProps<'div'>) {
    return (
        <div className={cn("flex items-center gap-2 p-3 text-sm text-green-500 bg-green-500/10 rounded-md border border-green-500/20", className)} {...props}>
            <Check />
            {message}
        </div>
    )
}