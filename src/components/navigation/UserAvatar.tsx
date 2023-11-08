'use client'

import { UserButton } from '@clerk/nextjs';
import { FunctionComponent } from 'react';

interface UserAvatarProps { }

const UserAvatar: FunctionComponent<UserAvatarProps> = () => {
    return (
        <div className='flex items-center gap-2 mt-auto border-t-1 pt-2'>
            <UserButton afterSignOutUrl="/" />
            <div>
                <p className='text-sm'>Bernard Sapida</p>
                <p className='text-tiny text-default-600'>Student</p>
            </div>
        </div>
    );
}

export default UserAvatar;