'use client';

import { FunctionComponent, useTransition } from 'react';

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc/client';

interface CollegeCardProps {
    college: string;
}

const CollegeCard: FunctionComponent<CollegeCardProps> = ({ college }) => {
    return (
        <AccountCard
            params={{
                header: "Colleges",
                description:
                    "The colleges in the university belong to you.",
            }}
        >
            <AccountCardBody>
                <input
                    name="name"
                    defaultValue={college ?? ""}
                    disabled={true}
                    className="block text-sm w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-slate-700"
                />
            </AccountCardBody>
        </AccountCard>
    );
}

export default CollegeCard;