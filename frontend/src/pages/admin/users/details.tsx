import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userApi } from "@/features/user/api";
import type { UserResponseDTO, UpdateUserRequestDTO } from "@shared/dtos";
import { Role } from "@shared/enums";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { ErrorAlert } from "@/components/error-alert";
import { SuccessAlert } from "@/components/sucess-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
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
import UserStats from "@/features/user/components/user-stats";

export default function AdminUserDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);
    const { isAdmin, user: authUser, token, login } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserResponseDTO>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const [profileSuccess, setProfileSuccess] = useState<string>();

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
            return;
        }
        if (isNaN(userId)) {
            navigate("/admin/users");
            return;
        }

        const fetchData = async () => {
            try {
                const userData = await userApi.getById(userId);
                setUser(userData);
            } catch (err: unknown) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAdmin, userId, navigate]);

    if (loading) return <div className="flex justify-center p-8"><Spinner /></div>;
    if (!user) return <Navigate to="/error" replace state={{ error: { message: `User #${userId} not found` } }} />;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProfileSuccess(undefined);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const newRoles: Role[] = [];

        if (formData.get("AUTHOR") === "on") newRoles.push(Role.AUTHOR);
        if (formData.get("SUPPORT") === "on") newRoles.push(Role.SUPPORT);
        if (formData.get("ADMIN") === "on") newRoles.push(Role.ADMIN);

        const updateData: UpdateUserRequestDTO = {
            id: user.id,
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            jobTitle: formData.get("jobTitle") as string,
            roles: newRoles
        };

        try {
            const updated = await userApi.updateUser(updateData);
            if (updated.id === authUser?.id) {
                login({
                    ...authUser,
                    ...updated,
                }, token!)
            }
            setUser(updated);
            setProfileSuccess("User updated successfully");
        } catch (err: unknown) {
            setError(err as Error);
        }
    };

    return (
        <div className="container mx-auto py-6 space-y-8 max-w-4xl px-4">
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
                            <BreadcrumbPage>{user.firstname} {user.lastname}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{user.firstname} {user.lastname}</h1>
                    <p className="text-muted-foreground">Manage details and roles.</p>
                </div>
            </div>

            {/* User Statistics */}
            <UserStats userId={userId} />

            <Separator />

            {/* FORM */}
            <div>
                {error && <ErrorAlert error={error} />}
                {profileSuccess && <SuccessAlert message={profileSuccess} className="mb-4" />}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Personal Information</h3>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>First Name</FieldLabel>
                                    <Input name="firstname" defaultValue={user.firstname} required />
                                </Field>
                                <Field>
                                    <FieldLabel>Last Name</FieldLabel>
                                    <Input name="lastname" defaultValue={user.lastname} required />
                                </Field>
                                <Field>
                                    <FieldLabel>Job Title</FieldLabel>
                                    <Input name="jobTitle" defaultValue={user.jobTitle} />
                                </Field>
                            </FieldGroup>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Roles</h3>
                            <div className="border p-4 rounded-md flex flex-col gap-4">
                                <FieldLabel>
                                    <Field orientation="horizontal">
                                        <Checkbox id="AUTHOR" name="AUTHOR" defaultChecked={user.roles.includes(Role.AUTHOR)} />
                                        <FieldContent>
                                            <FieldTitle>Author</FieldTitle>
                                            <FieldDescription>
                                                Can create and manage their own tickets.
                                            </FieldDescription>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel>
                                    <Field orientation="horizontal">
                                        <Checkbox id="SUPPORT" name="SUPPORT" defaultChecked={user.roles.includes(Role.SUPPORT)} />
                                        <FieldContent>
                                            <FieldTitle>Support</FieldTitle>
                                            <FieldDescription>
                                                Can manage and respond to tickets.
                                            </FieldDescription>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel>
                                    <Field orientation="horizontal">
                                        <Checkbox id="ADMIN" name="ADMIN" defaultChecked={user.roles.includes(Role.ADMIN)} />
                                        <FieldContent>
                                            <FieldTitle>Admin</FieldTitle>
                                            <FieldDescription>
                                                Can manage users, tickets, comments, assignments.
                                            </FieldDescription>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                <strong>Note:</strong> Removing the ADMIN role from yourself may block access to this page.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => navigate("/admin/users")}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
