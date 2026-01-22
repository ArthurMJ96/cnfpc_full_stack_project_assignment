import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { UserResponseDTO } from '@shared/dtos'

export function UserAvatar({
    user,
    ...props
}: {
    user: UserResponseDTO
} & React.ComponentProps<typeof Avatar>) {
    return (
        <Avatar className='ring-ring ring-2' {...props}>
            <AvatarFallback className='text-xs'>{user.firstname[0]}{user.lastname[0]}</AvatarFallback>
        </Avatar>
    )
}
