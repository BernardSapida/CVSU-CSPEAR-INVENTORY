'use client';

import { Button, Input, Textarea } from '@nextui-org/react';
import { TbSend } from "react-icons/tb";
import { columns, borrowStatusOptions } from "../../../Data/RequestData";

import CustomTable from '@/components/CustomTable';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { useContext } from 'react';
import { toast } from 'sonner';

function BorrowRequest() {
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity", "stock", "is_available", "actions"];
    const { user } = useContext(UserContext);
    const getBorrowItems = trpc.borrowItems.getBorrowItems.useQuery();
    const sendBorrowRequest = trpc.borrowItems.sendBorrowRequest.useMutation();
    const equipments = getBorrowItems.data?.equipments;

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const NOT_EQUIPMENTS_KEY = ['borrow_date', 'return_date', 'purpose']
        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const data: Record<string, any> = Object.fromEntries(form.entries());
        const dataKeys = Object.keys(data);
        const borrowItem = getBorrowItems.data;

        if (!borrowItem) return;

        if (dataKeys.length == 3) {
            toast.error('The borrow request is empty, please add at least 1 equipment.');
            return;
        }

        for (let key of dataKeys) {
            if (!NOT_EQUIPMENTS_KEY.includes(key)) {
                const equipmentId = key;
                const quantity = Number(data[key]);

                updateEquipmentQuantity(equipmentId, quantity);
                continue;
            }
            if (
                key === 'borrow_date' ||
                key === 'return_date'
            ) {
                const emptyValue = data[key] == '';

                if (emptyValue && key == 'borrow_date') {
                    toast.error(`You need to provide the borrow date.`);
                    return;
                }

                if (emptyValue && key == 'return_date') {
                    toast.error(`You need to provide the return date.`);
                    return;
                }

                borrowItem[key] = new Date(data[key]);
                continue;
            }

            if (key === 'purpose') {
                const emptyValue = data[key] == '';

                if (emptyValue) {
                    toast.error(`Please provide a purpose for borrowing.`);
                    return;
                }
                borrowItem[key] = data[key];
            }
        }

        sendBorrowRequest.mutate({
            ...borrowItem,
            name: 'Bernard Sapida',
            email: 'bernard.sapida@cvsu.edu.ph',
            college: 'CEIT',
            role: 'Student',
            borrow_status: 'Pending',
            condition: 'Good',
            note: '',
            created_at: new Date()
        } as any);

        if (sendBorrowRequest.isError) {
            toast.error('I apologize, we encountered an issue while sending the request.');
        }

        toast.success('You have sent the borrow request.');
    };

    const updateEquipmentQuantity = (equipmentId: string, equipmentQuantity: number) => {
        if (equipments === undefined) return;

        for (let equipment of equipments) {
            if (equipment.id == equipmentId) {
                equipment.quantity = equipmentQuantity;
                return;
            }
        }
    }

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Request</h1>
            <hr />
            <div className='mt-5'>
                <form id='borrow-request' onSubmit={handleSubmit}>
                    <div className='flex gap-3'>
                        <div className='w-full'>
                            <CustomTable
                                columns={columns}
                                records={equipments}
                                borrowStatusOptions={borrowStatusOptions}
                                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                                user={user}
                                type={'REQUEST'}
                                isLoading={getBorrowItems.isLoading}
                                getTableData={getBorrowItems}
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
                                    type='submit'
                                    startContent={<TbSend />}
                                    color='primary'
                                    size='sm'
                                    form='borrow-request'
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