import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { userApi } from "@/features/user/api";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ErrorAlert } from "@/components/error-alert";
import { Spinner } from "@/components/ui/spinner";
import { SuccessAlert } from "@/components/sucess-alert";
import { Navigate } from "react-router-dom";
import type { UpdateUserRequestDTO, UpdatePasswordRequestDTO, AuthResponseDTO } from "@shared/dtos";
import type { ErrorWithCause } from "@/lib/api";

export default function ProfilePage() {
    const { token, user, login, isAdmin } = useAuth();
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [profileErrors, setProfileErrors] = useState<ErrorWithCause>();
    const [passwordErrors, setPasswordErrors] = useState<ErrorWithCause>();
    const [profileSuccess, setProfileSuccess] = useState<string>();
    const [passwordSuccess, setPasswordSuccess] = useState<string>();

    if (!user || !token) return <Navigate to="/login" replace />;

    const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: UpdateUserRequestDTO = {
            id: user.id,
            roles: user.roles,
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            jobTitle: (formData.get("jobTitle") as string) || user.jobTitle,
        };

        try {
            setLoadingProfile(true);
            setProfileErrors(undefined);
            setProfileSuccess(undefined);
            const updatedUser = await userApi.updateUser(data);

            const authData = {
                ...user,
                ...updatedUser,
                token,
            } as AuthResponseDTO;

            login(authData, token);
            setProfileSuccess("Profile updated successfully");
        } catch (error) {
            setProfileErrors(error as ErrorWithCause);
        } finally {
            setLoadingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: UpdatePasswordRequestDTO = {
            id: user.id,
            currentPassword: formData.get("currentPassword") as string,
            newPassword: formData.get("newPassword") as string,
            newPasswordConfirm: formData.get("newPasswordConfirm") as string,
        };

        try {
            setLoadingPassword(true);
            setPasswordErrors(undefined);
            setPasswordSuccess(undefined);
            await userApi.updatePassword(data);
            setPasswordSuccess("Password updated successfully");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setPasswordErrors(error as ErrorWithCause);
        } finally {
            setLoadingPassword(false);
        }
    };

    return (
        <div className="container max-w-2xl py-10 space-y-8 mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                <p className="text-muted-foreground">
                    Manage your personal information and security settings.
                </p>
            </div>

            <Separator />

            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-medium">Profile Information</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Update your public profile details.
                        </p>
                        {profileErrors && <ErrorAlert error={profileErrors} />}
                        {profileSuccess && <SuccessAlert message={profileSuccess} />}
                    </div>
                    <form onSubmit={handleProfileSubmit}>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                                    <Input id="firstname" name="firstname" defaultValue={user.firstname} required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                                    <Input id="lastname" name="lastname" defaultValue={user.lastname} required />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="jobTitle">Job Title</FieldLabel>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    defaultValue={user.jobTitle}
                                    disabled={!isAdmin}
                                    title={!isAdmin ? "Only admins can edit job titles" : undefined}
                                />
                                {!isAdmin && (
                                    <FieldDescription>
                                        Contact an administrator to update your job title.
                                    </FieldDescription>
                                )}
                            </Field>

                            <Field className="flex justify-end">
                                <Button type="submit" disabled={loadingProfile}>
                                    {loadingProfile && <Spinner className="mr-2" />}
                                    Save Profile
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-medium">Security</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Update your password to keep your account secure.
                    </p>
                    {passwordErrors && <ErrorAlert error={passwordErrors} />}
                    {passwordSuccess && <SuccessAlert message={passwordSuccess} />}
                    <form onSubmit={handlePasswordSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                                <Input id="currentPassword" name="currentPassword" type="password" required />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                                    <Input id="newPassword" name="newPassword" type="password" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="newPasswordConfirm">Confirm New Password</FieldLabel>
                                    <Input id="newPasswordConfirm" name="newPasswordConfirm" type="password" required />
                                </Field>
                            </div>

                            <Field className="flex justify-end">
                                <Button type="submit" variant="secondary" disabled={loadingPassword}>
                                    {loadingPassword && <Spinner className="mr-2" />}
                                    Update Password
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </div>
    );
}
