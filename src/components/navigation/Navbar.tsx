'use client'

import Link from "next/link";
import UserAvatar from './UserAvatar';

import Menu from './Menu';
import { Skeleton } from '@nextui-org/react';
import { UserContext } from '@/store/UserContext';
import { useContext } from 'react';

export default function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="p-2 flex flex-col transition-all duration-300 border-r-1 h-screen">
      <Skeleton
        className='rounded w-fit'
        isLoaded={user?.role != undefined}
        children={
          <h1 className="font-semibold hover:opacity-75 transition-hover cursor-pointer">
            <Link href="/user/equipment-catalog">GYMTORY</Link>
          </h1>
        }
      />
      <Menu role={user?.role} />
      <UserAvatar />
    </nav>
  )
}
