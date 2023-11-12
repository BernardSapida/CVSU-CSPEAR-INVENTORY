'use client'

import ConditionChip from '@/components/ConditionChip';
import CustomTable from '@/components/CustomTable';
import RequestStatusChip from '@/components/RequestStatusChip';
import { trpc } from '@/lib/trpc/client';
import { Input, Textarea } from '@nextui-org/react';
import { columns, statusOptions } from "../../../../Data/ViewRequestData";
import moment from 'moment';

function BorrowRequest({ params }: { params: { request_id: string } }) {
    const { request_id } = params;
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity"];
    const { data: borrowRequest, isLoading } = trpc.adminBorrowRequest.getAdminBorrowRequestById.useQuery({ request_id });

    console.log(borrowRequest?.equipments)

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Request Details</h1>
            <hr />
            <div className='my-5'>
                <div className='w-full my-5'>
                    {
                        !isLoading &&
                        <CustomTable
                            columns={columns}
                            records={borrowRequest?.equipments}
                            statusOptions={statusOptions}
                            INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                            role={'Student'}
                            type={'VIEW-REQUEST'}
                        />
                    }
                </div>
                <div className='flex gap-3'>
                    <div className='w-full h-max p-3 rounded-xl'>
                        <h1 className='mb-3 text-xl'><strong>Borrow Details</strong></h1>
                        <hr />
                        <div className='mt-3'>
                            <Input
                                name='name'
                                labelPlacement='inside'
                                placeholder='Fullname'
                                label="Name"
                                defaultValue={borrowRequest?.name}
                                type='text'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='email'
                                labelPlacement='inside'
                                placeholder='Email address'
                                label="Email Address"
                                defaultValue={borrowRequest?.email}
                                type='email'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='Role'
                                labelPlacement='inside'
                                placeholder='Role'
                                label="Role"
                                defaultValue={borrowRequest?.role}
                                type='text'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='borrow_date'
                                labelPlacement='inside'
                                label="Borrow Date"
                                defaultValue={moment(borrowRequest?.borrow_date).format('YYYY-MM-DD')}
                                placeholder='#'
                                type='date'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='return_date'
                                labelPlacement='inside'
                                label="Return Date"
                                placeholder='#'
                                defaultValue={moment(borrowRequest?.return_date).format('YYYY-MM-DD')}
                                type='date'
                                className='mb-2'
                                disabled
                            />
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
                                className='mb-2'
                                defaultValue={borrowRequest?.purpose}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='w-full h-max p-3 rounded-xl'>
                        <h1 className='mb-3 text-xl'><strong>Borrow Status</strong></h1>
                        <hr />
                        <div className='mt-3'>
                            <div className='flex gap-2 my-5'>
                                <p className='font-semibold'>Borrow Status:</p>
                                <RequestStatusChip status='Pending' />
                            </div>
                            <div className='flex gap-2 my-5'>
                                <p className='font-semibold'>Condition Status:</p>
                                <ConditionChip status={borrowRequest?.condition ?? ''} />
                            </div>
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
                                className='mb-2'
                                defaultValue='Gagamitin sa FITT3'
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BorrowRequest;