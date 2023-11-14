import { UserContext } from '@/store/UserContext';
import { UserButton } from '@clerk/nextjs';
import { Skeleton } from '@nextui-org/react';
import { FunctionComponent, useContext } from 'react';

interface UserAvatarProps { }

const UserAvatar: FunctionComponent<UserAvatarProps> = () => {
    const { user } = useContext(UserContext);

    return (
        <Skeleton
            className='mt-auto rounded-lg'
            isLoaded={!!user}
            children={
                <div className='pt-2 flex items-center gap-2 border-t-1'>
                    <UserButton afterSignOutUrl="/" />
                    <div>
                        <p className='text-sm'>Bernard Sapida</p>
                        <p className='text-tiny text-default-600'>{user?.role}</p>
                    </div>
                </div>
            }
        />

    );
}

export default UserAvatar;