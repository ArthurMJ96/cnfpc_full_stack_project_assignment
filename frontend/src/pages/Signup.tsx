import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // todo
        console.log(data);
    };

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
                <SignupForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
