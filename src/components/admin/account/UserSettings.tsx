import { FunctionComponent } from 'react';
import EmailCard from './EmailCard';
import NameCard from './NameCard';
import CollegeCard from './CollegesCard';
import RoleCard from './RoleCard';

interface UserSettingsProps {
  user: User;
}

const UserSettings: FunctionComponent<UserSettingsProps> = ({ user }) => {
  const {
    firstname,
    lastname,
    email,
    college,
    role
  } = user;

  return (
    <>
      <NameCard
        firstName={firstname ?? ''}
        lastName={lastname ?? ''}
      />
      <EmailCard
        email={email ?? ''}
      />
      <CollegeCard
        college={college ?? ''}
      />
      <RoleCard
        role={role ?? ''}
      />
    </>
  );
}

export default UserSettings;