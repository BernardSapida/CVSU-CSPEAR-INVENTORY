'use client'

import ConditionChip from '@/components/ConditionChip';
import CustomTable from '@/components/CustomTable';
import RequestStatusChip from '@/components/RequestStatusChip';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { Input, Skeleton, Textarea } from '@nextui-org/react';
import moment from 'moment';
import { useContext } from 'react';
import { availabilityStatusOptions, columns } from "../../../../Data/ViewRequestData";

function BorrowRequest({ params }: { params: { request_id: string } }) {
    const { request_id } = params;
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity"];
    const getAdminBorrowRequestById = trpc.adminBorrowRequest.getAdminBorrowRequestById.useQuery({ request_id });
    const { user } = useContext(UserContext);
    const data = getAdminBorrowRequestById.data;
    const equipments = data?.equipments;
    const isLoading = getAdminBorrowRequestById.isLoading;

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
                        records={equipments}
                        availabilityStatusOptions={availabilityStatusOptions}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        user={user}
                        type={'VIEW-REQUEST'}
                        isLoading={isLoading}
                        getTableData={getAdminBorrowRequestById}
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
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Input
                                    name='name'
                                    labelPlacement='inside'
                                    placeholder='Fullname'
                                    label="Name"
                                    defaultValue={data?.name}
                                    type='text'
                                    className='mb-2'
                                    disabled
                                />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Input
                                    name='email'
                                    labelPlacement='inside'
                                    placeholder='Email address'
                                    label="Email Address"
                                    defaultValue={data?.email}
                                    type='email'
                                    className='mb-2'
                                    disabled
                                />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Input
                                    name='Role'
                                    labelPlacement='inside'
                                    placeholder='Role'
                                    label="Role"
                                    defaultValue={data?.role}
                                    type='text'
                                    className='mb-2'
                                    disabled
                                />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Input
                                    name='borrow_date'
                                    labelPlacement='inside'
                                    label="Borrow Date"
                                    defaultValue={moment(data?.borrow_date).format('YYYY-MM-DD')}
                                    placeholder='#'
                                    type='date'
                                    className='mb-2'
                                    disabled
                                />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Input
                                    name='return_date'
                                    labelPlacement='inside'
                                    label="Return Date"
                                    placeholder='#'
                                    defaultValue={moment(data?.return_date).format('YYYY-MM-DD')}
                                    type='date'
                                    disabled
                                />
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Textarea
                                    name='purpose'
                                    label="Purpose"
                                    placeholder='What is the purpose of request'
                                    minRows={1}
                                    maxRows={8}
                                    classNames={{
                                        inputWrapper: [
                                            "h-max",
                                        ],
                                    }}
                                    defaultValue={data?.purpose}
                                    disabled
                                />
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
                                className='rounded-lg my-5'
                                isLoaded={!isLoading}
                            >
                                <div className='flex gap-2 '>
                                    <p className='font-semibold'>Borrow Status:</p>
                                    <RequestStatusChip status='Pending' />
                                </div>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg my-5'
                                isLoaded={!isLoading}
                            >
                                <div className='flex gap-2'>
                                    <p className='font-semibold'>Condition Status:</p>
                                    <ConditionChip status={data?.condition ?? ''} />
                                </div>
                            </Skeleton >
                            <Skeleton
                                className='rounded-lg mb-2'
                                isLoaded={!isLoading}
                            >
                                <Textarea
                                    name='note'
                                    label="Note"
                                    placeholder='Some reason about the equipment condition'
                                    minRows={1}
                                    maxRows={10}
                                    classNames={{
                                        inputWrapper: [
                                            "h-max",
                                        ],
                                    }}
                                    defaultValue={data?.purpose ?? 'None'}
                                    disabled
                                />
                            </Skeleton >
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default BorrowRequest;