import { FunctionComponent } from 'react';

import { AccountCard, AccountCardBody } from "./AccountCard";

interface NameCardProps {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
}

const NameCard: FunctionComponent<NameCardProps> = ({ firstName, lastName }) => {
  return (
    <AccountCard
      params={{
        header: "Full Name",
        description:
          "Your full name or a display name.",
      }}
    >
      <AccountCardBody>
        <input
          defaultValue={`${firstName} ${lastName}` ?? ""}
          name="name"
          disabled={true}
          className="block text-sm w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-slate-700"
        />
      </AccountCardBody>
    </AccountCard>
  );
}

export default NameCard;