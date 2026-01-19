import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function AvatarRing ({
    firstname,
    lastname,
}: {
    firstname: string;
    lastname: string;
}) {
    return (
        <Avatar className='ring-ring ring-2'>
            <AvatarFallback className='text-xs'>{firstname[0]}{lastname[0]}</AvatarFallback>
        </Avatar>
    )
}
