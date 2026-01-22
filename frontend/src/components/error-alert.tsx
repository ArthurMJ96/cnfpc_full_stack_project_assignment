import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react"

export type ErrorAlertProps = {
    message?: string;
    cause?: string[];
}

export function ErrorAlert({ error: { message, cause, ...props } }: { error: ErrorAlertProps | Error } & React.ComponentProps<typeof Alert>) {

    const causes = Array.isArray(cause) ? cause : [];

    return (
        <Alert variant="destructive" {...props}>
            <AlertCircleIcon />
            {
                causes?.length ?
                    <AlertDescription>
                        <ul className="list-inside list-disc text-sm">
                            {causes?.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                    : <AlertTitle>{message || "Error!"}</AlertTitle>
            }
        </Alert>
    )
}