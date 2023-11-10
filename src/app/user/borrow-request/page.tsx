import EquipmentTable from '@/components/users/borrow-request/EquipmentTable';
import { Button, Input, Textarea } from '@nextui-org/react';
import { TbSend } from "react-icons/tb";
import { columns, equipments, statusOptions } from "../../../Data/Data";

function BorrowRequest() {
    const handleSubmit = async (formData: FormData) => {
        'use server'
        console.log(formData);
        // toast.success('You have successfully sent the borrow request');
    };

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Request</h1>
            <hr />
            <div className='mt-5'>
                <form action={handleSubmit}>
                    <div className='flex gap-3'>
                        <div className='w-full'>
                            <EquipmentTable
                                columns={columns}
                                equipments={equipments}
                                statusOptions={statusOptions}
                            />
                        </div>
                        <div className='shadow-md border-1 max-w-xs w-full h-max p-3 rounded-xl'>
                            <h1 className='mb-4 text-xl'><strong>To borrow</strong></h1>
                            <Input
                                name='borrow_date'
                                labelPlacement='inside'
                                label="Borrow Date"
                                placeholder='#'
                                type='date'
                                className='mb-2'
                            />
                            <Input
                                name='return_date'
                                labelPlacement='inside'
                                label="Return Date"
                                placeholder='#'
                                type='date'
                                className='mb-2'
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
                            />
                            <div className='flex justify-end'>
                                <Button
                                    startContent={<TbSend />}
                                    color='primary'
                                    type='submit'
                                    size='sm'
                                >Send request</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BorrowRequest;