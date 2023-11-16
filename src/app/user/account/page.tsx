'use client';

import { UserContext } from '@/store/UserContext';
import { useContext } from 'react';
import UserSettings from "../../../components/users/account/UserSettings";
import { Skeleton } from '@nextui-org/react';

export default function Account() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Skeleton
        className='rounded-lg w-max my-6'
        isLoaded={!!user}
      >
        <h1 className="text-3xl font-semibold">Account</h1>
      </Skeleton>
      <hr />
      <div className="space-y-6 mt-5">
        <UserSettings user={user} />
      </div>
    </>
  );
}
