'use client'

import { trpc } from '@/lib/trpc/client';
import { Chip, NavbarContent, NavbarItem, NavbarMenuItem, Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FunctionComponent } from 'react';

import { GrNotification, GrUserSettings } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { LuClipboardList } from 'react-icons/lu';
import { MdOutlineShoppingCart, MdPendingActions } from 'react-icons/md';

interface DesktopMenuProps {
    role: Role | undefined;
}

const DesktopMenu: FunctionComponent<DesktopMenuProps> = ({ role }) => {
    const { data: notificationCount, isLoading } = trpc.notification.getUserUnseenNotificationCount.useQuery();
    const pathname = usePathname();
    const menus: Record<string, any[]> = {
        user: [
            {
                name: "Equipments",
                path: "/user/equipment-catalog",
                icon: <LuClipboardList />,
            },
            {
                name: "Cart",
                path: "/user/cart",
                icon: <MdOutlineShoppingCart />,
            },
            {
                name: "Account",
                path: "/user/account",
                icon: <GrUserSettings />,
            },
            {
                name: "Requests",
                path: "/user/borrow-request",
                icon: <MdPendingActions />,
            },
            {
                name: "Notification",
                path: "/user/notification",
                icon: <GrNotification />,
            },
        ],
        admin: [
            // {
            //     name: "Dashboard",
            //     path: "/admin/dashboard",
            //     icon: <AiOutlineDashboard />,
            // },
            {
                name: "Equipments",
                path: "/admin/equipment-catalog",
                icon: <LuClipboardList />,
            },
            {
                name: "Requests",
                path: "/admin/borrow-requests",
                icon: <MdPendingActions />,
            },
            {
                name: "Account",
                path: "/admin/account",
                icon: <GrUserSettings />,
            },
            {
                name: "Reports",
                path: "/admin/reports",
                icon: <HiOutlineDocumentReport />,
            },
            {
                name: "Notification",
                path: "/admin/notification",
                icon: <GrNotification />,
            },
        ]
    }

    if (role) {
        return (
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {(menus[role != 'Admin' ? 'user' : 'admin']).map((menu, index) => (
                    menu.name === 'Notification' && role != 'Admin' ? (
                        <NavbarItem key={`${menu.name}-${index}`} isActive={pathname == menu.path}>
                            <Link color="foreground" href={menu.path} className='text-sm'>
                                {menu.name}{!isLoading && notificationCount != 0 && <Chip className='scale-75' color='danger' variant='shadow' size='sm'>{notificationCount}</Chip>}
                            </Link>
                        </NavbarItem>
                    ) : (
                        <NavbarItem key={`${menu.name}-${index}`} isActive={pathname == menu.path}>
                            <Link color="foreground" href={menu.path} className='text-sm'>
                                {menu.name}
                            </Link>
                        </NavbarItem>
                    )
                ))}
            </NavbarContent>
        );
    } else {
        return (
            <>
                {
                    [1, 2, 3, 4, 5].map((l, key) => (
                        <Skeleton
                            key={l}
                            className='w-20 rounded-lg'
                        >
                            <li key={l}>
                                {l}
                            </li>
                        </Skeleton >
                    ))
                }
            </>
        );
    }
}

export default DesktopMenu;