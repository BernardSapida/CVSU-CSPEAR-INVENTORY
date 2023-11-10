import { User } from '@clerk/nextjs/server';

import { FunctionComponent } from 'react';
import EmailCard from './EmailCard';
import NameCard from './NameCard';
import RoleCard from './RoleCard';

interface UserSettingsProps {
  user: User | null;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ user }) => {
  const {
    firstName,
    lastName
  } = user!;
  const email = user?.emailAddresses[0].emailAddress;

  return (
    <>
      <NameCard
        firstName={firstName ?? ''}
        lastName={lastName ?? ''}
      />
      <EmailCard
        email={email ?? ''}
      />
      <RoleCard
        role={'Admin' ?? ''}
      />
    </>
  );
}

export default UserSettings;