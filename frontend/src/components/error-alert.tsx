import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react"

export type ErrorAlertProps = {
    title?: string;
    cause?: string[];
}

export default function ErrorAlert({ error: { title, cause } }: { error: ErrorAlertProps }) {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{title || "Error!"}</AlertTitle>
            <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                    {cause?.map((error, index) => (
                        <li key={index} >
                            <span>{error}</span>
                        </li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    )
}