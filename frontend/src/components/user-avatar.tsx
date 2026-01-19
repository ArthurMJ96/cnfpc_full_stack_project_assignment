import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function UserAvatar({
    firstname,
    lastname,
    ...props
}: {
    firstname: string;
    lastname: string;
} & React.ComponentProps<typeof Avatar>) {
    return (
        <Avatar className='ring-ring ring-2' {...props}>
            <AvatarFallback className='text-xs'>{firstname[0]}{lastname[0]}</AvatarFallback>
        </Avatar>
    )
}
