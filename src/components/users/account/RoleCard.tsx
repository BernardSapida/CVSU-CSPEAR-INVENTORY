'use client';

import { FunctionComponent, useContext, useTransition } from 'react';

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';

interface RoleCardProps {
  role: string;
}

const RoleCard: FunctionComponent<RoleCardProps> = ({ role }) => {
  const { user, setUser } = useContext(UserContext);
  const Role: Record<string, string>[] = [
    { role: "Unknown" },
    { role: "Student" },
    { role: "Faculty" },
  ];
  const updateUserRole = trpc.users.updateUserRole.useMutation();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { role } = Object.fromEntries(form.entries()) as { role: Role };

    updateUserRole.mutate({ role });
    toast.success('You have successfully updated your Role.');
    setUser({ ...user!, role });
  };

  if (!role) return;

  return (
    <AccountCard
      params={{
        header: "Roles",
        description:
          "The role as a user.",
      }}
    >
      <AccountCardBody>
        <form onSubmit={handleSubmit} id='role-form'>
          <Select
            name='role'
            placeholder="Select your role"
            labelPlacement="outside"
            defaultSelectedKeys={[role]}
          >
            {
              Role.map(({ role }) => (
                role === 'Unknown' ?
                  <SelectItem
                    key={role} value={''}
                    textValue={'Choose your role'}
                  >
                    {'Choose your role'}
                  </SelectItem> :
                  <SelectItem
                    key={role} value={role}
                    textValue={role}
                  >
                    {role}
                  </SelectItem>
              ))
            }
          </Select>
        </form>
      </AccountCardBody>
      <AccountCardFooter description="">
        <button
          type='submit'
          form='role-form'
          className={`bg-slate-900 py-2.5 px-3.5 rounded-md font-medium text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
        // disabled={true}
        >
          Update Role
        </button>
      </AccountCardFooter>
    </AccountCard>
  );
}

export default RoleCard;