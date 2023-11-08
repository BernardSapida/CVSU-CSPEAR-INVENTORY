'use client'

import { trpc } from '@/lib/trpc/client';
import { FunctionComponent } from 'react';

interface DataProps {

}

const DataContainer: FunctionComponent<DataProps> = () => {
    const { data: users } = trpc.users.getUsers.useQuery();
    const { data: user } = trpc.users.getUserById.useQuery({ userId: '654a442f626c344f54bf2d2d' });

    return (
        <div>
            <p>
                {JSON.stringify(users)}
            </p>
            <p>
                {JSON.stringify(user)}
            </p>
        </div>
    );
}

export default DataContainer;