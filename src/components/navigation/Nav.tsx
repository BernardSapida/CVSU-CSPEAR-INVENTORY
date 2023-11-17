'use client'

import UserAvatar from './UserAvatar';

import { UserContext } from '@/store/UserContext';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export default function Nav() {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const path = usePathname();
  const authPage = path === '/sign-in' || path === '/sign-up';

  useEffect(() => {
    if (authPage) {
      window.localStorage.removeItem('user');
    }

    setIsLoaded(true);
  }, [authPage]);


  if (authPage) {
    return <></>;
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="md:hidden pr-3" justify="center">
        <Skeleton isLoaded={isLoaded} className='rounded-lg'>
          <NavbarBrand>
            <Image src={'/images/gymtory-logo.png'} height={30} width={30} alt='Gymtory Logo' />
            <p className="ml-2 font-bold text-inherit text-sm">Gymtory</p>
          </NavbarBrand>
        </Skeleton>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <Skeleton isLoaded={isLoaded} className='rounded-lg'>
          <NavbarBrand>
            <Image src={'/images/gymtory-logo.png'} height={30} width={30} alt='Gymtory Logo' />
            <p className="ml-2 font-bold text-inherit text-sm">Gymtory</p>
          </NavbarBrand>
        </Skeleton>
        <DesktopMenu role={user?.role} />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <UserAvatar />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <MobileMenu role={user?.role} />
      </NavbarMenu>
    </Navbar>
  )
}
