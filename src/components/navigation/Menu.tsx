'use client'

import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FunctionComponent } from 'react';

import { GrNotification, GrUserSettings } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { LuClipboardList, LuHistory } from 'react-icons/lu';
import { MdPendingActions } from 'react-icons/md';

interface MenuProps {
    role: Role | undefined;
}

const Menu: FunctionComponent<MenuProps> = ({ role }) => {
    const pathname = usePathname();
    const menu: Record<string, any[]> = {
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
                name: "Borrow Request",
                path: "/user/borrow-request",
                icon: <MdPendingActions />,
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
                name: "History",
                path: "/user/history",
                icon: <LuHistory />,
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
            <ul>
                {
                    (menu[role != 'Admin' ? 'user' : 'admin']).map((l, key) => (
                        <li key={l.path} className={`my-2 p-2 rounded ${l.path === pathname && 'bg-default-100'}`}>
                            <Link className={`flex flex-row items-center gap-2 text-sm w-max`} href={l.path}>{l.icon} {l.name}</Link>
                        </li>
                    ))
                }
            </ul>
        );
    } else {
        return (
            <ul>
                {
                    [1, 2, 3, 4, 5].map((l, key) => (
                        <Skeleton
                            key={l}
                            className='my-2 p-2 w-40 rounded'
                        >
                            <li key={l}>
                                {l}
                            </li>
                        </Skeleton >
                    ))
                }
            </ul>
        );
    }
}

export default Menu;