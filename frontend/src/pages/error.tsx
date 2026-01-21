import { ErrorAlert } from '@/components/error-alert';
import { Button } from '@/components/ui/button';
import type { ErrorWithCause } from '@/lib/api';
import { useLocation } from 'react-router-dom';

export default function Error({
    error,
}: {
    error?: ErrorWithCause;
}) {
    const location = useLocation();
    const { error: passedError } = location.state || {};

    return (
        <div className="container max-w-2xl mx-auto p-4 space-y-8">
            {passedError ? (
                <ErrorAlert error={passedError} />
            ) : (error && <ErrorAlert error={error} />)}

            <Button variant="link" onClick={() => window.history.back()}>
                Go Back
            </Button>
        </div>
    )
}

