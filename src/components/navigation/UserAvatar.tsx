import { UserContext } from '@/store/UserContext';
import { UserButton } from '@clerk/nextjs';
import { Skeleton } from '@nextui-org/react';
import { FunctionComponent, useContext } from 'react';

interface UserAvatarProps { }

const UserAvatar: FunctionComponent<UserAvatarProps> = () => {
    const { user } = useContext(UserContext);

    return (
        <Skeleton
            className='p-1 rounded-lg'
            isLoaded={!!user}
        >
            <div className='flex items-center gap-2'>
                <UserButton afterSignOutUrl="/" />
                <div className='hidden lg:block'>
                    <p className='text-sm font-semibold'>Bernard Sapida</p>
                    <p className='text-tiny text-default-600'>{user?.role == "UNKNOWN" ? 'User' : user?.role}</p>
                </div>
            </div>
        </Skeleton>
    );
}

export default UserAvatar;