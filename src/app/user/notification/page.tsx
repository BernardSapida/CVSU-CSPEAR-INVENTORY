'use client';

import Card from '@/components/users/notification/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function Notification() {
    const { data: notifications, isLoading } = trpc.notification.getUserNotification.useQuery();

    console.log(notifications)

    return (
        <>
            <Skeleton
                className='rounded-lg my-6 w-max'
                isLoaded={!isLoading}
            >
                <h1 className="text-3xl font-semibold">Notifications</h1>
            </Skeleton >
            <hr />
            <div className="space-y-3 py-3">
                {
                    isLoading ?
                        <>
                            <Skeleton className='rounded-lg'>
                                <Card
                                    title={''}
                                    notificationId={''}
                                    borrowStatus={''}
                                    isViewed={true}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton >
                            <Skeleton className='rounded-lg'>
                                <Card
                                    title={''}
                                    notificationId={''}
                                    borrowStatus={''}
                                    isViewed={true}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton >
                            <Skeleton className='rounded-lg'>
                                <Card
                                    title={''}
                                    notificationId={''}
                                    borrowStatus={''}
                                    isViewed={true}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                        </> :
                        (
                            notifications && notifications?.length > 0 ?
                                notifications?.map((notification: any) => (
                                    <Card
                                        key={notification.id}
                                        notificationId={notification.id}
                                        title={`Request #${notification.borrowRequest.id.slice(5, 15)}`}
                                        borrowStatus={notification.borrowStatus}
                                        isViewed={notification.isViewed}
                                        time={moment(notification.createdAt).fromNow()}
                                        url={`/user/view-borrow-request/${notification.borrowRequest.id}`}
                                    />
                                )) :
                                <p className='text-center mt-10'>No notifications</p>

                        )
                }
            </div >
        </>
    );
}

export default Notification;