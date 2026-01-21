import { LoginForm } from "@/features/auth/components/login-form";
import { authApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ErrorAlert } from "@/components/error-alert";
import type { LoginRequestDTO } from "@shared/dtos";
import type { ErrorWithCause } from "@/lib/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorWithCause>();
  const { login } = useAuth();
  const nav = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: LoginRequestDTO = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      setLoading(true);
      setErrors(undefined);
      const res = await authApi.login(data);
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
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
