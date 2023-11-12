'use client';

import { trpc } from '@/lib/trpc/client';
import UserSettings from "../../../components/users/account/UserSettings";

export default function Account() {
  const { data: user, isLoading } = trpc.userAccount.getUserAccount.useQuery();

  return (
    <>
      <h1 className="text-3xl font-semibold my-6">Account</h1>
      <hr />
      <div className="space-y-6 mt-5">
        {!isLoading && user && <UserSettings user={user} />}
      </div>
    </>
  );
}
