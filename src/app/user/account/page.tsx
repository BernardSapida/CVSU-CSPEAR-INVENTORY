'use client';

import { trpc } from '@/lib/trpc/client';
import UserSettings from "../../../components/users/account/UserSettings";
import { UserContext } from '@/store/UserContext';
import { useContext } from 'react';

export default function Account() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1 className="text-3xl font-semibold my-6">Account</h1>
      <hr />
      <div className="space-y-6 mt-5">
        <UserSettings user={user} />
      </div>
    </>
  );
}
