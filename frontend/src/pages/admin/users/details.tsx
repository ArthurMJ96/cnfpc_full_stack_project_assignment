import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userApi } from "@/features/user/api";
import type { UserResponseDTO, UserStatsResponseDTO, UpdateUserRequestDTO } from "@shared/dtos";
import { Role } from "@shared/enums";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { ErrorAlert } from "@/components/error-alert";
import { SuccessAlert } from "@/components/sucess-alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { StatisticsCard } from "@/components/statistics-card";
import { Briefcase, CheckCircle2, MessageSquare, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminUserDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);
    const { isAdmin, user: authUser, token, login } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserResponseDTO>();
    const [stats, setStats] = useState<UserStatsResponseDTO>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined | unknown>();
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
                const [userData, statsData] = await Promise.all([
                    userApi.getById(userId),
                    userApi.getUserStats(userId)
                ]);
                setUser(userData);
                setStats(statsData);
            } catch (err: unknown) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAdmin, userId, navigate]);

    if (loading) return <div className="flex justify-center p-8"><Spinner /></div>;
    if (error) return <ErrorAlert error={error} />;
    if (!user) return <div className="p-8">User not found</div>;

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
            setError(err);
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
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatisticsCard
                        icon={<Briefcase />}
                        title="Assigned Tickets"
                        value={stats.assignedTickets.toString()}
                    />
                    <StatisticsCard
                        icon={<CheckCircle2 />}
                        title="Resolved Tickets"
                        value={stats.resolvedAssignedTickets.toString()}
                    />
                    <StatisticsCard
                        icon={<PlusCircle />}
                        title="Created Tickets"
                        value={stats.createdTickets.toString()}
                    />
                    <StatisticsCard
                        icon={<MessageSquare />}
                        title="Total Comments"
                        value={stats.totalComments.toString()}
                    />
                </div>
            )}

            <Separator />

            {/* FORM */}
            <div>
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
                            <div className="space-y-2 border p-4 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="AUTHOR" name="AUTHOR" defaultChecked={user.roles.includes(Role.AUTHOR)} />
                                    <label htmlFor="AUTHOR" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Author</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="SUPPORT" name="SUPPORT" defaultChecked={user.roles.includes(Role.SUPPORT)} />
                                    <label htmlFor="SUPPORT" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Support</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="ADMIN" name="ADMIN" defaultChecked={user.roles.includes(Role.ADMIN)} />
                                    <label htmlFor="ADMIN" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Admin</label>
                                </div>
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
