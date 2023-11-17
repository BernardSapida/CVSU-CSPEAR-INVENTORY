'use client'

import { NavbarItem, Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FunctionComponent } from 'react';

import { GrNotification, GrUserSettings } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { LuClipboardList } from 'react-icons/lu';
import { MdOutlineShoppingCart, MdPendingActions } from 'react-icons/md';

interface MobileMenuProps {
    role: Role | undefined;
}

const MobileMenu: FunctionComponent<MobileMenuProps> = ({ role }) => {
    const pathname = usePathname();
    const menus: Record<string, any[]> = {
        user: [
            // {
            //     name: "Dashboard",
            //     path: "/user/dashboard",
            //     icon: <AiOutlineDashboard />,
            // },
            {
                name: "Equipment Catalog",
                path: "/user/equipment-catalog",
                icon: <LuClipboardList />,
            },
            {
                name: "Cart",
                path: "/user/cart",
                icon: <MdOutlineShoppingCart />,
            },
            {
                name: "My Account",
                path: "/user/account",
                icon: <GrUserSettings />,
            },
            {
                name: "Notification",
                path: "/user/notification",
                icon: <GrNotification />,
            },
            {
                name: "Borrow Requests",
                path: "/user/borrow-request",
                icon: <MdPendingActions />,
            },
        ],
        admin: [
            // {
            //     name: "Dashboard",
            //     path: "/admin/dashboard",
            //     icon: <AiOutlineDashboard />,
            // },
            {
                name: "Equipment Catalog",
                path: "/admin/equipment-catalog",
                icon: <LuClipboardList />,
            },
            {
                name: "Borrow Requests",
                path: "/admin/borrow-requests",
                icon: <MdPendingActions />,
            },
            {
                name: "My Account",
                path: "/admin/account",
                icon: <GrUserSettings />,
            },
            {
                name: "Notification",
                path: "/admin/notification",
                icon: <GrNotification />,
            },
            {
                name: "Reports",
                path: "/admin/reports",
                icon: <HiOutlineDocumentReport />,
            },
        ]
    }

    if (role) {
        return (
            <>
                {(menus[role != 'Admin' ? 'user' : 'admin']).map((menu, index) => (
                    <NavbarItem className='my-4' key={`${menu.name}-${index}`}>
                        <Link
                            className="w-full"
                            href={menu.path}
                        >
                            {menu.name}
                        </Link>
                    </NavbarItem>
                ))}
            </>
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

export default MobileMenu;