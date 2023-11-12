'use client';

import Card from '@/components/users/history/Card';
import { trpc } from '@/lib/trpc/client';
import moment from 'moment';

function BorrowRequest() {
    const { data: histories } = trpc.notification.getUserHistory.useQuery();

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">History</h1>
            <hr />
            <div className="space-y-3 py-3">
                {
                    histories?.map(({ id, request_id, title, borrow_status, condition, created_at }) => (
                        <Card
                            key={id}
                            title={title.slice(0, 26)}
                            borrow_status={borrow_status}
                            equipment_condition={condition}
                            time={moment(created_at).fromNow()}
                            url={`/user/view-borrow-request/${request_id}`}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default BorrowRequest;