'use client';

import Card from '@/components/users/notification/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function Notification() {
    const { data: notifications, isLoading } = trpc.notification.getUserNotification.useQuery();

    return (
        <>
            <Skeleton
                className='rounded-lg my-6 w-max'
                isLoaded={!isLoading}
                children={
                    <h1 className="text-3xl font-semibold">Notifications</h1>
                }
            />
            <hr />
            <div className="space-y-3 py-3">
                {
                    isLoading ?
                        <>
                            <Skeleton
                                className='rounded-lg'
                                children={
                                    <Card
                                        title={''}
                                        borrow_status={''}
                                        is_viewed={true}
                                        time={moment('').fromNow()}
                                        url={''}
                                    />
                                }
                            />
                            <Skeleton
                                className='rounded-lg'
                                children={
                                    <Card
                                        title={''}
                                        borrow_status={''}
                                        is_viewed={true}
                                        time={moment('').fromNow()}
                                        url={''}
                                    />
                                }
                            />
                            <Skeleton
                                className='rounded-lg'
                                children={
                                    <Card
                                        title={''}
                                        borrow_status={''}
                                        is_viewed={true}
                                        time={moment('').fromNow()}
                                        url={''}
                                    />
                                }
                            />
                        </> :
                        notifications?.map(({ id, request_id, title, borrow_status, is_viewed, created_at }) => (
                            <Card
                                key={id}
                                title={title.slice(0, 26)}
                                borrow_status={borrow_status}
                                is_viewed={is_viewed}
                                time={moment(created_at).fromNow()}
                                url={`/user/view-borrow-request/${request_id}`}
                            />
                        ))
                }
            </div>
        </>
    );
}

export default Notification;