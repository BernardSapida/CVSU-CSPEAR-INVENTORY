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
                    notifications?.map(({ id, request_id, title, description, is_viewed, created_at }) => (
                        <Card
                            key={id}
                            title={title.slice(0, 26)}
                            description={description}
                            is_viewed={is_viewed}
                            time={moment(created_at).fromNow()}
                            url={`/admin/borrow-requests/${request_id}`}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default Notification;