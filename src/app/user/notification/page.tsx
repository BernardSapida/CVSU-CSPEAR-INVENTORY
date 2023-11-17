'use client';

import Card from '@/components/users/notification/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function Notification() {
    const { data, isLoading } = trpc.notification.getUserNotification.useQuery();
    const notifications = data?.borrowRequests;

    console.log(notifications);

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
                                    borrowStatus={''}
                                    isViewed={true}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton >
                            <Skeleton className='rounded-lg'>
                                <Card
                                    title={''}
                                    borrowStatus={''}
                                    isViewed={true}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton >
                            <Skeleton className='rounded-lg'>
                                <Card
                                    title={''}
                                    borrowStatus={''}
                                    isViewed={true}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                        </> :
                        notifications?.map((notification: any) => (
                            <Card
                                key={notification.userNotifications[0].id}
                                title={`Request #${notification.userNotifications[0].id.slice(5, 15)}`}
                                borrowStatus={notification.userNotifications[0].borrowRequest.borrowStatus}
                                isViewed={notification.userNotifications[0].isViewed}
                                time={moment(notification.userNotifications[0].createdAt).fromNow()}
                                url={`/user/view-borrow-request/${notification.userNotifications[0].borrowRequest.id}`}
                            />
                        ))
                }
            </div >
        </>
    );
}

export default Notification;