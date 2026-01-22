import { LogOutIcon, SquarePen, UserIcon } from 'lucide-react'
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from '@/features/auth/hooks/useAuth'
import { UserAvatar } from '@/features/user/components/user-avatar'
import { Button } from '@/components/ui/button'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Role } from '@shared/enums'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

export function UserMenu() {
  const { user, logout, isAuthor } = useAuth()

  if (!user) return (
    <Button variant='outline' className='py-6'>
      <Skeleton className='h-8 w-8 rounded-full' />
      <div className='flex flex-col gap-1 leading-none text-start'>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-3 w-20' />
      </div>
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='py-6 min-w-40 justify-start'>
          <UserAvatar user={user} />
          <div className='flex flex-col gap-1 leading-none text-start'>
            <span className='max-w-40 truncate text-sm leading-none font-semibold'>{user.firstname} {user.lastname}</span>
            <span className='text-muted-foreground truncate text-xs'>
              {/* Sort Roles with 'Author' last */}
              {user.roles.sort((a, b) =>
                a === Role.AUTHOR ? 1 : b === Role.AUTHOR ? -1 : a.localeCompare(b)
              ).map(capitalizeFirstLetter).join(', ')}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='flex flex-1 flex-col'>
          <span className='text-popover-foreground'>{user.firstname} {user.lastname}</span>
          <span className='text-muted-foreground text-xs'>{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to="/profile" className="flex items-center w-full">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </NavLink>
          </DropdownMenuItem>
          {isAuthor && <DropdownMenuItem asChild>
            <NavLink to="/ticket/create" className="flex items-center w-full">
              <SquarePen className="mr-2 h-4 w-4" />
              <span>Create Ticket</span>
            </NavLink>
          </DropdownMenuItem>}
          <DropdownMenuItem asChild>
            <ThemeToggle className="flex justify-start w-full gap-3" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
              <LogOutIcon />Log out
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <LogOutIcon />
              </AlertDialogMedia>
              <AlertDialogTitle>Log out?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={logout}>Log out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

