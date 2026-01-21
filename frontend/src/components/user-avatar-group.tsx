import { Button } from '@/components/ui/button'
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { UserAvatar } from './user-avatar';
import type { UserResponseDTO } from '@shared/dtos';
import { cn } from '@/lib/utils';

export function UserAvatarGroup(
    { users, className, variant = "ghost", ...props }: { users: UserResponseDTO[] } & React.ComponentProps<typeof Button>
) {
    return (
        <Button
            variant={variant}
            className={cn("h-auto px-2 py-1.5 m-0 rounded-full min-h-8", className)}
            {...props}
        >
            {users.length === 0 ? (
                <span className="text-xs text-muted-foreground">
                    Unassigned
                </span>
            ) : (
                <AvatarGroup>
                    {users.slice(0, 3).map((user) => (
                        <UserAvatar size="sm" key={user.id} user={user} />
                    ))}
                    {Math.max(0, users.length - 3) > 0 && (
                        <AvatarGroupCount>
                            +{Math.max(0, users.length - 3)}
                        </AvatarGroupCount>
                    )}
                </AvatarGroup>
            )}
        </Button>
    )
}
