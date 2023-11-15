'use client'

import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useContext, useEffect } from 'react';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
    const userContext = useContext(UserContext);
    const router = useRouter();
    const registerUser = trpc.authCallback.handleAuth.useMutation({
        onSettled(data) {
            if (data) {
                userContext.setUser(data);

                if (data && data.role === 'Admin') {
                    return router.replace('/admin/equipment-catalog');
                }

                else if (data && (data.role === 'Student' || data.role === 'Faculty')) {
                    return router.replace('/user/equipment-catalog');
                }
            }
        },
    });

    useEffect(() => {
        registerUser.mutate();
    }, [registerUser])

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Spinner />
                <h3 className='font-semibold text-xl text-center'>
                    We are setting up your account
                </h3>
                <p className='text-center'>You will be redirected automatically</p>
            </div>
        </div>
    );
}

export default Page;