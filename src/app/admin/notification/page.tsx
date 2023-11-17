'use client';

import Card from '@/components/admin/notification/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function Notification() {
    const { data: notifications, isLoading } = trpc.notification.getAdminNotification.useQuery();

    console.log(notifications)

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
                    notifications?.map(({ id, isViewed, createdAt, borrowRequests: { user: { firstname, lastname } }, borrowRequestId }) => (
                        <Card
                            key={id}
                            title={`Request #${id.slice(5, 15)}`}
                            description={`${firstname} ${lastname} has sent a borrow request.`}
                            isViewed={isViewed}
                            time={moment(createdAt).fromNow()}
                            url={`/admin/borrow-requests/${borrowRequestId}`}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default Notification;