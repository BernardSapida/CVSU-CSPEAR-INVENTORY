'use client'

import CustomTable from '@/components/CustomTable';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive, BiWalk } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';
import { columns, equipments, statusOptions } from "../../../../Data/ViewRequestData";
import { capitalize } from '@/utils/text';

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

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const input = Object.fromEntries(form.entries());

        console.log(input)
    };
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
                            <Select
                                name='borrow_status'
                                label="Borrow Status"
                                className='mb-2'
                                placeholder="Select Status"
                                labelPlacement="inside"
                                aria-label='Borrow status select'
                            // defaultSelectedKeys={['available']}
                            >
                                {
                                    ['pending', 'to pickup', 'picked up', 'returned'].map(status => (
                                        <SelectItem
                                            className='capitalize'
                                            key={status}
                                            value={status}
                                            textValue={capitalize(status)}
                                        >
                                            <span className='capitalize'>{status}</span>
                                        </SelectItem>
                                    ))
                                }
                            </Select>
                            <Select
                                name='equipment_condition'
                                label="Equipments Condition"
                                className='mb-2'
                                placeholder="Select condition"
                                labelPlacement="inside"
                                aria-label='Equipment condition select'
                            // defaultSelectedKeys={['available']}
                            >
                                {
                                    ['good', 'misplaced', 'damaged'].map(status => (
                                        <SelectItem
                                            className='capitalize'
                                            key={status} value={status}
                                            textValue={capitalize(status)}
                                        >
                                            <span className='capitalize'>{status}</span>
                                        </SelectItem>
                                    ))
                                }
                            </Select>
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
                            />
                            <div className='flex justify-end'>
                                <Button
                                    startContent={<TbSend />}
                                    color='primary'
                                    type='submit'
                                    size='sm'
                                >Update status</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BorrowRequest;