import { FunctionComponent } from 'react';

import { AccountCard, AccountCardBody } from "./AccountCard";

interface EmailCardProps {
  email: string | null | undefined;
}

const EmailCard: FunctionComponent<EmailCardProps> = ({ email }) => {
  return (
    <AccountCard
      params={{
        header: "Email Address",
        description: "The CvSU email address you are using with your account.",
      }}
    >
      <AccountCardBody>
        <input
          defaultValue={email ?? ""}
          name="name"
          disabled={true}
          className="block text-sm w-full px-3 py-2 rounded-md border border-slate-200 focus:outline-slate-700"
        />
      </AccountCardBody>
    </AccountCard>
  );
}

export default EmailCard;