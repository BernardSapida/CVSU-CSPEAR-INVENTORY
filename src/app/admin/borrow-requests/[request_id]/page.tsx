'use client'

import CustomTable from '@/components/CustomTable';
import { trpc } from '@/lib/trpc/client';
import { formatUnderscoreStatus, getFormattedBorrowStatus } from '@/utils/text';
import { Button, Input, Select, SelectItem, Skeleton, Textarea } from '@nextui-org/react';
import moment from 'moment';
import { useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { toast } from 'sonner';
import { columns } from "../../../../Data/ViewRequestData";

function BorrowRequest({ params }: { params: { request_id: string } }) {
    const { request_id } = params;
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity"];
    const getAdminBorrowRequestById = trpc.adminBorrowRequest.getAdminBorrowRequestById.useQuery({ request_id });
    const { data, isLoading } = getAdminBorrowRequestById;
    const viewAdminNotification = trpc.notification.viewAdminNotification.useMutation();
    const updateAdminBorrowRequestById = trpc.adminBorrowRequest.updateAdminBorrowRequestById.useMutation({
        onSettled: () => {
            toast.success('You have successfully updated the borrow request.');
        },
        onError: ({ message }) => {
            toast.error(message);
        }
    });

    useEffect(() => {
        viewAdminNotification.mutate({ request_id });
    }, [viewAdminNotification, request_id]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { borrow_status, condition, note } = Object.fromEntries(form.entries()) as { borrow_status: string, condition: string, note: string };

        updateAdminBorrowRequestById.mutate({
            id: request_id,
            borrow_status: formatUnderscoreStatus(borrow_status),
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
                        records={data?.equipments}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        type={'VIEW-REQUEST'}
                        isLoading={isLoading}
                        getTableData={getAdminBorrowRequestById}
                    />
                </div>
                <form id='borrow-request' onSubmit={handleSubmit}>
                    <div className='flex gap-3'>
                        <div className='w-full h-max p-3 rounded-xl'>
                            <h1 className='mb-3 text-xl'><strong>Borrow Details</strong></h1>
                            <hr />
                            <div className='mt-3'>
                                <Skeleton
                                    className='rounded-lg mb-2'
                                    isLoaded={!isLoading}
                                >
                                    <Input
                                        name='name'
                                        labelPlacement='inside'
                                        label="Name"
                                        placeholder='Fullname'
                                        defaultValue={data?.name}
                                        type='text'
                                        className='mb-2'
                                        disabled
                                    />
                                </Skeleton>
                                <Skeleton
                                    className='rounded-lg mb-2'
                                    isLoaded={!isLoading}
                                >
                                    <Input
                                        name='email'
                                        labelPlacement='inside'
                                        label="Email Address"
                                        placeholder='Email address'
                                        defaultValue={data?.email}
                                        type='email'
                                        className='mb-2'
                                        disabled
                                    />
                                </Skeleton>
                                <Skeleton
                                    className='rounded-lg mb-2'
                                    isLoaded={!isLoading}
                                >
                                    <Input
                                        name='Role'
                                        labelPlacement='inside'
                                        label="Role"
                                        placeholder='Role'
                                        defaultValue={data?.role}
                                        type='text'
                                        className='mb-2'
                                        disabled
                                    />
                                </Skeleton>
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
                                        disabled
                                    />
                                </Skeleton>
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
                                </Skeleton>
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
                                </Skeleton>
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
                                        !isLoading &&
                                        <Select
                                            name='borrow_status'
                                            label="Borrow Status"
                                            placeholder="Select Status"
                                            labelPlacement="inside"
                                            aria-label='Borrow status select'
                                            defaultSelectedKeys={[getFormattedBorrowStatus(data?.borrow_status!)]}
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
                                        !isLoading &&
                                        <Select
                                            name='condition'
                                            label="Equipments Condition"
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