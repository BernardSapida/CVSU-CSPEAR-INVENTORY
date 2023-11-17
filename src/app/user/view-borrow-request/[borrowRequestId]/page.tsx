'use client'

import ConditionChip from '@/components/ConditionChip';
import CustomTable from '@/components/CustomTable';
import RequestStatusChip from '@/components/RequestStatusChip';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { Skeleton } from '@nextui-org/react';
import moment from 'moment';
import { useContext } from 'react';
import { availabilityStatusOptions, columns } from "../../../../Data/ViewRequestData";

function BorrowRequest({ params }: { params: { borrowRequestId: string } }) {
    const { borrowRequestId } = params;
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity"];
    const getBorrowRequestById = trpc.borrowRequest.getBorrowRequestById.useQuery({ borrowRequestId });
    const { user } = useContext(UserContext);
    const data = getBorrowRequestById.data;
    const isLoading = getBorrowRequestById.isLoading;
    const cartItems = data?.cart.cartItems;

    return (
        <>
            <Skeleton
                className='rounded-lg my-6'
                isLoaded={!isLoading}
            >
                <h1 className="text-3xl font-semibold">Borrow Request Details</h1>
            </Skeleton >
            <hr />
            <div className='my-5'>
                <div className='w-full my-5'>
                    <CustomTable
                        columns={columns}
                        records={cartItems}
                        availabilityStatusOptions={availabilityStatusOptions}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        user={user}
                        type={'VIEW-REQUEST'}
                        isLoading={isLoading}
                        getTableData={getBorrowRequestById}
                    />
                </div>
                <div className='flex gap-3'>
                    <div className='w-full h-max p-3 rounded-xl'>
                        <Skeleton
                            className='rounded-lg mb-3'
                            isLoaded={!isLoading}
                        >
                            <h1 className='text-xl'><strong>Borrow Details</strong></h1>
                        </Skeleton >
                        <hr />
                        <div className='mt-3'>
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Name</p>
                                <p>{`${data?.user?.firstname} ${data?.user?.lastname}`}</p>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Email Address</p>
                                <p>{data?.user?.email}</p>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Role</p>
                                <p>{data?.user?.role}</p>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Borrow Date</p>
                                <p>{moment(data?.borrowDate).format('MMMM DD, YYYY')}</p>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Return Date</p>
                                <p>{moment(data?.returnDate).format('MMMM DD, YYYY')}</p>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Purpose</p>
                                <p>{data?.purpose}</p>
                            </Skeleton >
                        </div >
                    </div >
                    <div className='w-full h-max p-3 rounded-xl'>
                        <Skeleton
                            className='rounded-lg mb-3'
                            isLoaded={!isLoading}
                        >
                            <h1 className='text-xl'><strong>Borrow Status</strong></h1>
                        </Skeleton >
                        <hr />
                        <div className='mt-3'>
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Borrow Status</p>
                                <RequestStatusChip status='Pending' />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Condition Status</p>
                                <ConditionChip status={data?.condition ?? ''} />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-5'
                                isLoaded={!isLoading}
                            >
                                <p className='text-tiny font-semibold'>Note</p>
                                <p>{data?.note || 'No notes'}</p>
                            </Skeleton >
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default BorrowRequest;