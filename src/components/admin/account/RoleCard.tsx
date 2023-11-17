'use client';

import { FunctionComponent } from 'react';

import { AccountCard, AccountCardBody } from "./AccountCard";

interface RoleCardProps {
  role: string;
}

const RoleCard: FunctionComponent<RoleCardProps> = ({ role }) => {
  return (
    <AccountCard
      params={{
        header: "Roles",
        description:
          "The role as a user.",
      }}
    >
      <AccountCardBody>
        <input
          name="name"
          defaultValue={role ?? ""}
          disabled={true}
          className="block text-sm w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-slate-700"
        />
      </AccountCardBody>
    </AccountCard>
  );
}

export default RoleCard;