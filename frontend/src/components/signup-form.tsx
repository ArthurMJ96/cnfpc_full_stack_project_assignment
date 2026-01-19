import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Fill in the form below to create your account
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                        <Input id="firstname" name="firstname" type="text" placeholder="John" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                        <Input id="lastname" name="lastname" type="text" placeholder="Doe" required />
                    </Field>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    <FieldDescription>
                        We&apos;ll use this to contact you. We will not share your email
                        with anyone else.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" type="password" required />
                    <FieldDescription>
                        Must be at least 8 characters long.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="passwordConfirm">Confirm Password</FieldLabel>
                    <Input id="passwordConfirm" name="passwordConfirm" type="password" required />
                    <FieldDescription>Please confirm your password.</FieldDescription>
                </Field>
                <Field>
                    <Button type="submit">Create Account</Button>
                </Field>
                <Field>
                    <FieldDescription className="px-6 text-center">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
