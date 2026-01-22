import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userApi } from "@/features/user/api";
import type { CreateUserRequestDTO } from "@shared/dtos";
import { Role } from "@shared/enums";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "@/components/error-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminUserCreatePage() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState<Error | undefined | unknown>();
    const [loading, setLoading] = useState(false);

    // Initial check (also handled by ProtectedRoute in App.tsx)
    if (!isAdmin) {
        navigate("/");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(undefined);
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const password = formData.get("password") as string;
        const passwordConfirm = formData.get("passwordConfirm") as string;

        if (password !== passwordConfirm) {
            setError(new Error("Passwords do not match"));
            setLoading(false);
            return;
        }

        const newRoles: Role[] = [];
        if (formData.get("role_AUTHOR") === "on") newRoles.push(Role.AUTHOR);
        if (formData.get("role_SUPPORT") === "on") newRoles.push(Role.SUPPORT);
        if (formData.get("role_ADMIN") === "on") newRoles.push(Role.ADMIN);

        const createData: CreateUserRequestDTO = {
            email: formData.get("email") as string,
            password: password,
            passwordConfirm: passwordConfirm,
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            jobTitle: formData.get("jobTitle") as string,
            roles: newRoles
        };

        try {
            await userApi.createUser(createData);
            navigate("/admin/users");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-6 space-y-8 max-w-4xl">
            <div className="space-y-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/admin/users">Users</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Create User</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
                    <p className="text-muted-foreground">Add a new user to the system.</p>
                </div>
            </div>

            <Separator />

            {!!error && <ErrorAlert error={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Account Information</h3>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input name="email" type="email" required placeholder="user@example.com" />
                            </Field>
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input name="password" type="password" required />
                            </Field>
                            <Field>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input name="passwordConfirm" type="password" required />
                            </Field>
                        </FieldGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>First Name</FieldLabel>
                                <Input name="firstname" required placeholder="John" />
                            </Field>
                            <Field>
                                <FieldLabel>Last Name</FieldLabel>
                                <Input name="lastname" required placeholder="Doe" />
                            </Field>
                            <Field>
                                <FieldLabel>Job Title</FieldLabel>
                                <Input name="jobTitle" placeholder="Software Engineer" />
                            </Field>
                        </FieldGroup>
                    </div>

                    <div className="col-span-2 space-y-4">
                        <h3 className="text-lg font-medium">Roles</h3>
                        <div className="space-y-2 border p-4 rounded-md">
                            <div className="flex items-center gap-2">
                                <Checkbox id="role_AUTHOR" name="role_AUTHOR" defaultChecked />
                                <label htmlFor="role_AUTHOR" className="text-sm font-medium leading-none cursor-pointer">Author</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="role_SUPPORT" name="role_SUPPORT" />
                                <label htmlFor="role_SUPPORT" className="text-sm font-medium leading-none cursor-pointer">Support</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="role_ADMIN" name="role_ADMIN" />
                                <label htmlFor="role_ADMIN" className="text-sm font-medium leading-none cursor-pointer">Admin</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => navigate("/admin/users")}>Cancel</Button>
                    <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create User"}</Button>
                </div>
            </form>
        </div>
    );
}
