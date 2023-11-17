'use client'

import CustomTable from '@/components/CustomTable';
import { trpc } from '@/lib/trpc/client';
import { formatStatus, getFormattedBorrowStatus } from '@/utils/text';
import { Button, Input, Select, SelectItem, Skeleton, Textarea } from '@nextui-org/react';
import moment from 'moment';
import { useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { toast } from 'sonner';
import { columns } from "../../../../Data/ViewRequestData";

function BorrowRequest({ params }: { params: { borrowRequestId: string } }) {
    const { borrowRequestId } = params;
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity"];
    const getBorrowRequestById = trpc.borrowRequest.getBorrowRequestById.useQuery({ borrowRequestId });
    const { data, isLoading } = getBorrowRequestById;
    const viewAdminNotification = trpc.notification.viewAdminNotification.useMutation();
    const updateAdminBorrowRequestById = trpc.borrowRequest.updateBorrowRequestById.useMutation({
        onSuccess: () => {
            toast.success('You have successfully updated the borrow request.');
        },
        onError: ({ message }) => {
            toast.error(message);
        }
    });

    console.log(getBorrowRequestById.data)

    useEffect(() => {
        viewAdminNotification.mutate({ borrowRequestId });
    }, [borrowRequestId]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { borrowStatus, condition, note } = Object.fromEntries(form.entries()) as { borrowStatus: string, condition: string, note: string };

        updateAdminBorrowRequestById.mutate({
            id: borrowRequestId,
            borrowStatus: formatStatus(borrowStatus),
            condition: condition,
            note: note
        })
    };

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Request Details</h1>
            <hr />
            <div className='my-5'>
                <div className='w-full my-5'>
                    <CustomTable
                        columns={columns}
                        records={data?.cart.cartItems}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        type={'VIEW-REQUEST'}
                        isLoading={isLoading}
                        getTableData={getBorrowRequestById}
                    />
                </div>
                <form id='borrow-request' onSubmit={handleSubmit}>
                    <div className='flex gap-3'>
                        <div className='w-full h-max p-3 rounded-xl'>
                            <h1 className='mb-3 text-xl'><strong>Borrow Details</strong></h1>
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
                            </div>
                        </div>
                        <div className='w-full h-max p-3 rounded-xl'>
                            <h1 className='mb-3 text-xl'><strong>Borrow Status</strong></h1>
                            <hr />
                            <div className='mt-3'>
                                <Skeleton
                                    className='rounded-lg mb-2'
                                    isLoaded={!isLoading}
                                >
                                    {
                                        !isLoading && data?.borrowStatus &&
                                        <Select
                                            name='borrowStatus'
                                            label="Borrow Status"
                                            placeholder="Select Status"
                                            labelPlacement="inside"
                                            aria-label='Borrow status select'
                                            defaultSelectedKeys={[getFormattedBorrowStatus(data?.borrowStatus!)]}
                                        >
                                            {
                                                ['Pending', 'To Pickup', 'Picked Up', 'Returned'].map(status => (
                                                    <SelectItem
                                                        key={status}
                                                        value={status}
                                                        textValue={status}
                                                    >
                                                        {status}
                                                    </SelectItem>
                                                ))
                                            }
                                        </Select>
                                    }
                                </Skeleton>
                                <Skeleton
                                    className='rounded-lg mb-2'
                                    isLoaded={!isLoading}
                                >
                                    {
                                        !isLoading && data?.condition &&
                                        <Select
                                            name='condition'
                                            label="Condition"
                                            placeholder="Select condition"
                                            labelPlacement="inside"
                                            aria-label='Equipment condition select'
                                            defaultSelectedKeys={[data?.condition!]}
                                        >
                                            {
                                                ['Good', 'Misplaced', 'Damaged'].map(status => (
                                                    <SelectItem
                                                        className='capitalize'
                                                        key={status}
                                                        value={status}
                                                        textValue={status}
                                                    >
                                                        {status}
                                                    </SelectItem>
                                                ))
                                            }
                                        </Select>
                                    }
                                </Skeleton>
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
                                        className='mb-2'
                                        defaultValue={data?.note}
                                    />
                                </Skeleton>
                                <div className='flex justify-end'>
                                    <Skeleton
                                        className='rounded-lg mb-2'
                                        isLoaded={!isLoading}
                                    >
                                        <Button
                                            startContent={<TbSend />}
                                            color='primary'
                                            type='submit'
                                            size='sm'
                                            form='borrow-request'
                                        >Update status</Button>
                                    </Skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BorrowRequest;