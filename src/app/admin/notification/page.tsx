'use client';

import Card from '@/components/admin/notification/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function Notification() {
    const { data: notifications, isLoading } = trpc.notification.getAdminNotification.useQuery();

    return (
        <>
            <Skeleton
                className='rounded-lg w-max my-6'
                isLoaded={!isLoading}
            >
                <h1 className="text-3xl font-semibold">Notifications</h1>
            </Skeleton>
            <hr />
            <div className="space-y-3 py-3">
                {
                    isLoading ?
                        [1, 2, 3]?.map((value, index: number) => (
                            <Skeleton key={index} className='rounded-lg'>
                                <Card
                                    title={''}
                                    description={''}
                                    isViewed={true}
                                    time={''}
                                    url={''}
                                />
                            </Skeleton>
                        )) :
                        (
                            notifications?.length! > 0 ?
                                notifications?.map(({ id, isViewed, createdAt, borrowRequests: { user: { firstname, lastname } }, borrowRequestId }) => (
                                    <Card
                                        key={id}
                                        title={`Request #${id.slice(5, 15)}`}
                                        description={`${firstname} ${lastname} has sent a borrow request.`}
                                        isViewed={isViewed}
                                        time={moment(createdAt).fromNow()}
                                        url={`/admin/borrow-requests/${borrowRequestId}`}
                                    />
                                )) :
                                <p className='text-center mt-10'>No notifications</p>
                        )
                }
            </div>
        </>
    );
}

export default Notification;