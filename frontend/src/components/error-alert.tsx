import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react"

export type ErrorAlertProps = {
    message?: string;
    cause?: string[];
}

export default function ErrorAlert({ error: { message, cause, ...props } }: { error: ErrorAlertProps } & React.ComponentProps<typeof Alert>) {
    return (
        <Alert variant="destructive" {...props}>
            <AlertCircleIcon />
            {
                cause?.length ?
                    <AlertDescription>
                        <ul className="list-inside list-disc text-sm">
                            {cause?.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                    : <AlertTitle>{message || "Error!"}</AlertTitle>
            }
        </Alert>
    )
}