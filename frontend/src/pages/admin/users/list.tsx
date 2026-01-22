import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userApi } from "@/features/user/api";
import type { UserResponseDTO } from "@shared/dtos";
import { Role } from "@shared/enums";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "@/components/error-alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminUserListPage() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined | unknown>();

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
            return;
        }

        const fetchUsers = async () => {
            try {
                const data = await userApi.getAll();
                setUsers(data);
            } catch (err: unknown) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [isAdmin, navigate]);

    if (error) return <ErrorAlert error={error} />;

    const filterUsers = (role?: Role) => {
        if (!role) return users;
        return users.filter(u => u.roles.includes(role));
    };

    const renderTable = (data: UserResponseDTO[]) => (
        <div className="flex-1 border rounded-lg bg-card overflow-hidden">
            <ScrollArea className="h-[calc(100vh-250px)] w-full">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium border-b sticky top-0 z-10">
                        <tr>
                            <th className="p-3 w-12.5">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Job Title</th>
                            <th className="p-3">Roles</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <tr key={index}>
                                    <td className="p-3"><Skeleton className="h-4 w-8" /></td>
                                    <td className="p-3"><Skeleton className="h-4 w-32" /></td>
                                    <td className="p-3"><Skeleton className="h-4 w-24" /></td>
                                    <td className="p-3"><Skeleton className="h-4 w-20" /></td>
                                    <td className="p-3"><Skeleton className="h-4 w-16 ml-auto" /></td>
                                </tr>
                            ))
                        ) : (
                            data.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="p-3 font-mono text-xs">#{user.id}</td>
                                    <td className="p-3 font-medium">{user.firstname} {user.lastname}</td>
                                    <td className="p-3 text-muted-foreground">{user.jobTitle || "-"}</td>
                                    <td className="p-3">
                                        <div className="flex gap-1 flex-wrap">
                                            {user.roles.map(role => (
                                                <span key={role} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <Button asChild variant="link" size="sm">
                                            <Link to={`/admin/users/${user.id}`}>Details</Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </ScrollArea>
        </div>
    );

    return (
        <div className="container mx-auto h-full w-full flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between p-2 rounded-md bg-background/50 backdrop-blur-sm">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage system users and their roles.</p>
                </div>
                <Button onClick={() => navigate("/admin/users/create")}>Add User</Button>
            </div>

            <Tabs defaultValue="all" className="w-full h-full flex flex-col">
                <TabsList className="w-fit">
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                    <TabsTrigger value="authors">Authors</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex-1 mt-4">
                    {renderTable(users)}
                </TabsContent>
                <TabsContent value="support" className="flex-1 mt-4">
                    {renderTable(filterUsers(Role.SUPPORT))}
                </TabsContent>
                <TabsContent value="authors" className="flex-1 mt-4">
                    {renderTable(filterUsers(Role.AUTHOR))}
                </TabsContent>
                <TabsContent value="admins" className="flex-1 mt-4">
                    {renderTable(filterUsers(Role.ADMIN))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
