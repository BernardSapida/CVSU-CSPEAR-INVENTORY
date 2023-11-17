'use client';

import { UserContext } from '@/store/UserContext';
import { useContext, useEffect } from 'react';
import UserSettings from "../../../components/users/account/UserSettings";
import { Skeleton } from '@nextui-org/react';
import { toast } from 'sonner';

export default function Account() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.role === 'UNKNOWN') {
      toast.info('Please set your user role.');
    }

    if (user?.college === 'UNKNOWN') {
      toast.info('Please set your college.');
    }
  }, [user]);

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
