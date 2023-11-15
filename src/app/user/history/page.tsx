'use client';

import Card from '@/components/users/history/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function BorrowRequest() {
    const { data: histories, isLoading } = trpc.notification.getUserHistory.useQuery();

    return (
        <>
            <Skeleton
                className='rounded-lg my-6 w-max'
                isLoaded={!isLoading}
            >
                <h1 className="text-3xl font-semibold">History</h1>
            </Skeleton>
            <hr />
            <div className="space-y-3 py-3">
                {
                    isLoading ?
                        <>
                            <Skeleton
                                className='rounded-lg'
                            >
                                <Card
                                    title={''}
                                    borrow_status={''}
                                    equipment_condition={''}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                            <Skeleton
                                className='rounded-lg'
                            >
                                <Card
                                    title={''}
                                    borrow_status={''}
                                    equipment_condition={''}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                            <Skeleton
                                className='rounded-lg'
                            >
                                <Card
                                    title={''}
                                    borrow_status={''}
                                    equipment_condition={''}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                        </> :
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