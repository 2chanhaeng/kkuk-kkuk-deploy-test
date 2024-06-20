import { User } from 'next-auth';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_PROFILE, MY_PAGE_PATH } from '@/lib/constants';
import { Pencil, Settings, Stamp } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { NavBarItemProps } from './types';

export const headerLogoItems: NavBarItemProps[] = [
  {
    href: '/',
    Inner: (
      <Avatar className="w-7 h-7">
        <AvatarImage src="/kkuk-kkuk.svg" />
      </Avatar>
    ),
  },
];

export const getHeaderUserMenuItems = (user?: Pick<User, 'image'>): NavBarItemProps[] => [
  { href: '/kits/new', Inner: <Pencil className="h-8 w-8 fill-foreground" />, isGuest: false },
  { href: '/rallies', Inner: <Stamp className="h-8 w-8 stroke-foreground" />, isGuest: false },
  {
    href: '/my',
    Inner: (
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={user?.image ?? DEFAULT_PROFILE} />
      </Avatar>
    ),
    isGuest: false,
    showAtMyPage: false,
  },
  { href: '/my/settings', Inner: <Settings className="h-8 w-8 fill-foreground" />, showAtMyPage: true },
  {
    href: '/api/auth/signin',
    Inner: (
      <Button type="button" className="text-base px-4 py-2 h-fit rounded-lg">
        로그인
      </Button>
    ),
    isGuest: true,
  },
];

export const filterByAuth =
  (user?: User) =>
  ({ isGuest }: NavBarItemProps) =>
    !!user !== !!isGuest;

export const filterByPath =
  (path: string) =>
  ({ showAtMyPage }: NavBarItemProps) =>
    showAtMyPage === undefined || path.startsWith(MY_PAGE_PATH) === showAtMyPage;
