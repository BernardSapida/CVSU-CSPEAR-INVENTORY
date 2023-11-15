'use client'

import Link from "next/link";
import UserAvatar from './UserAvatar';

import Menu from './Menu';
import { Skeleton } from '@nextui-org/react';
import { UserContext } from '@/store/UserContext';
import { useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const path = usePathname();
  const authPage = path === '/sign-in' || path === '/sign-up';

  useEffect(() => {
    if (authPage) {
      window.localStorage.removeItem('user');
    }
  }, [authPage])

  if (authPage) {
    return <></>;
  }

  return (
    <nav className="p-2 flex flex-col transition-all duration-300 border-r-1 h-screen">
      <Skeleton
        className='rounded w-fit'
        isLoaded={user?.role != undefined}
      >
        <h1 className="font-semibold hover:opacity-75 transition-hover cursor-pointer">
          <Link href="/user/equipment-catalog">GYMTORY</Link>
        </h1>
      </Skeleton >
      <Menu role={user?.role} />
      <UserAvatar />
    </nav>
  )
}
