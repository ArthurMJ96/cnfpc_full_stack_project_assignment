import { authApi } from "@/features/auth/api";
import { SignupForm } from "@/features/auth/components/signup-form"
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorAlert from "@/components/error-alert";
import type { RegisterRequestDTO } from "@shared/dtos";
import type { ErrorWithCause } from "@/lib/api";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorWithCause>();
    const { login } = useAuth();
    const nav = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: RegisterRequestDTO = {
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            passwordConfirm: formData.get("passwordConfirm") as string,
            jobTitle: formData.get("jobTitle") as string,
        };

        try {
            setLoading(true);
            setErrors(undefined);
            const res = await authApi.register(data);
            if (!res) {
                setErrors({ message: "Unexpected error occurred during login." });
                return;
            }
            login(res, res.token);
        } catch (error: ErrorWithCause | unknown) {
            setErrors(error as ErrorWithCause);
            return;
        } finally {
            setLoading(false);
        }
        nav("/");
    };

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm space-y-4">
                {errors && <ErrorAlert error={errors} />}
                <SignupForm onSubmit={handleSubmit} loading={loading} />
            </div>
        </div>
    )
}
