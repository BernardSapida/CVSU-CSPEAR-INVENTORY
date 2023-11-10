import EquipmentTable from '@/components/view-borrow-request/EquipmentTable';
import { Chip, Input, Textarea } from '@nextui-org/react';
import { columns, equipments, statusOptions } from "../../../Data/Data";
import { getColor } from '@/utils';
import { BiTimeFive, BiWalk } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function BorrowRequest({ params }: { params: { request_id: string } }) {
    const { request_id } = params;

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

    const handleSubmit = async (formData: FormData) => {
        'use server'
        console.log(formData);
    };

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Request Details</h1>
            <hr />
            <div className='mt-5'>
                <div className='flex gap-3'>
                    <div className='w-full'>
                        <EquipmentTable
                            columns={columns}
                            equipments={equipments}
                        />
                    </div>
                    <div className='shadow-md border-1 max-w-xs w-full h-max p-3 rounded-xl'>
                        <h1 className='mb-3 text-xl'><strong>Borrow Details</strong></h1>
                        <hr />
                        <div className='mt-3'>
                            <div className='text-sm flex gap-2 items-center mb-3'>
                                <p>Status:</p>
                                <Chip
                                    size='sm'
                                    variant='flat'
                                    startContent={getIcon('Pending')}
                                    color={getColor('Pending')}
                                    className='text-tiny'
                                >
                                    Pending
                                </Chip>
                            </div>
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
                </div>
            </div>
        </>
    );
}

export default BorrowRequest;