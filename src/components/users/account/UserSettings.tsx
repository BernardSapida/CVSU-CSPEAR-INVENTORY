import { FunctionComponent } from 'react';
import NameCard from './NameCard';
import EmailCard from './EmailCard';
import CollegeCard from './CollegesCard';
import RoleCard from './RoleCard';
import { Skeleton } from '@nextui-org/react';

interface UserSettingsProps {
  user?: User
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ user }) => {
  return (
    <>
      <Skeleton
        className='rounded-lg'
        isLoaded={!!user}
        children={
          <NameCard
            firstName={user?.firstname ?? ''}
            lastName={user?.lastname ?? ''}
          />
        }
      />
      <Skeleton
        className='rounded-lg'
        isLoaded={!!user}
        children={
          <EmailCard
            email={user?.email ?? ''}
          />
        }
      />
      <Skeleton
        className='rounded-lg'
        isLoaded={!!user}
        children={
          <CollegeCard
            user_id={user?.id ?? ''}
            college={user?.college ?? ''}
          />
        }
      />
      <Skeleton
        className='rounded-lg'
        isLoaded={!!user}
        children={
          <RoleCard
            user_id={user?.id ?? ''}
            role={user?.role ?? ''}
          />
        }
      />
    </>
  );
}

export default UserSettings;