'use client';

import { FunctionComponent, useTransition } from 'react';

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface RoleCardProps {
  role: string;
}

const RoleCard: FunctionComponent<RoleCardProps> = ({ role }) => {
  const colleges: Record<string, string>[] = [
    { role: "Student" },
    { role: "Professor" },
  ];
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { name } = Object.fromEntries(form.entries()) as { name: string };

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) alert("Successfully updated name!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: "Roles",
        description:
          "The role as a user.",
      }}
    >
      <AccountCardBody>
        <Select
          placeholder="Select your role"
          labelPlacement="outside"
          defaultSelectedKeys={[role]}
        >
          {
            colleges.map(({ role }) => (
              <SelectItem
                key={role} value={role}
                textValue={role}
              >
                {role}
              </SelectItem>
            ))
          }
        </Select>
      </AccountCardBody>
      <AccountCardFooter description="">
        <button
          className={`bg-slate-900 py-2.5 px-3.5 rounded-md font-medium text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => toast.success('Role has been updated')}
        // disabled={true}
        >
          Update Role
        </button>
      </AccountCardFooter>
    </AccountCard>
  );
}

export default RoleCard;