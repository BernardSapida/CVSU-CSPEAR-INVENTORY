'use client';

import Card from '@/components/users/history/Card';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';

function BorrowRequest() {
    const { data, isLoading } = trpc.notification.getUserBorrowRequest.useQuery();
    const borrowRequests = data?.borrowRequests;

    return (
        <>
            <Skeleton
                className='rounded-lg my-6 w-max'
                isLoaded={!isLoading}
            >
                <h1 className="text-3xl font-semibold">Borrow Requests</h1>
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
                                    borrowStatus={''}
                                    condition={''}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                            <Skeleton
                                className='rounded-lg'
                            >
                                <Card
                                    title={''}
                                    borrowStatus={''}
                                    condition={''}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                            <Skeleton
                                className='rounded-lg'
                            >
                                <Card
                                    title={''}
                                    borrowStatus={''}
                                    condition={''}
                                    time={moment('').fromNow()}
                                    url={''}
                                />
                            </Skeleton>
                        </> :
                        (
                            borrowRequests && borrowRequests?.length > 0 ?
                                borrowRequests?.map(({ id, borrowStatus, condition, createdAt }) => (
                                    <Card
                                        key={id}
                                        title={`Request #${id.slice(5, 15)}`}
                                        borrowStatus={borrowStatus}
                                        condition={condition}
                                        time={moment(createdAt).fromNow()}
                                        url={`/user/view-borrow-request/${id}`}
                                    />
                                )) :
                                <p className='text-center mt-10'>No borrow requests</p>
                        )
                }
            </div>
        </>
    );
}

export default BorrowRequest;