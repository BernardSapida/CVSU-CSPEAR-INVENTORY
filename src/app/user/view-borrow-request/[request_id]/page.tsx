'use client'

import CustomTable from '@/components/CustomTable';
import IconChip from '@/components/IconChip';
import { Input, Textarea } from '@nextui-org/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive, BiWalk } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { columns, equipments, statusOptions } from "../../../../Data/ViewRequestData";

function BorrowRequest({ params }: { params: { request_id: string } }) {
    const { request_id } = params;
    const INITIAL_VISIBLE_COLUMNS = ["id", "equipment", "quantity", "stock", "status"];

    const getIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <BiTimeFive />;
            case 'to pickup':
                return <BiWalk />;
            case 'picked up':
                return <BsBoxSeam />;
            case 'returned':
                return <AiOutlineCheckCircle />;
        }
    }

    // const handleSubmit = async (formData: FormData) => {
    //     'use server'
    //     console.log(formData);
    // };

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Request Details</h1>
            <hr />
            <div className='my-5'>
                <div className='w-full my-5'>
                    <CustomTable
                        columns={columns}
                        records={equipments}
                        statusOptions={statusOptions}
                        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                        role={'USER'}
                        type={'VIEW-REQUEST'}
                    />
                </div>
                <div className='flex gap-3'>
                    <div className='w-full h-max p-3 rounded-xl'>
                        <h1 className='mb-3 text-xl'><strong>Borrow Details</strong></h1>
                        <hr />
                        <div className='mt-3'>
                            <Input
                                name='name'
                                labelPlacement='inside'
                                label="Name"
                                defaultValue='Bernard Sapida'
                                type='text'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='email'
                                labelPlacement='inside'
                                label="Email Address"
                                defaultValue='bernard.sapida@cvsu.edu.ph'
                                type='email'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='Role'
                                labelPlacement='inside'
                                label="Role"
                                defaultValue='Faculty'
                                type='text'
                                className='mb-2'
                                disabled
                            />
                            <Input
                                name='borrow_date'
                                labelPlacement='inside'
                                label="Borrow Date"
                                defaultValue='2023-11-21'
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
                                defaultValue='2023-12-01'
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
                                defaultValue='Gagamitin sa FITT3'
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
                                <IconChip status='Pending' />
                            </div>
                            <div className='flex gap-2 my-5'>
                                <p className='font-semibold'>Condition Status:</p>
                                <IconChip status='good' />
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