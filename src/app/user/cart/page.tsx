'use client';

import { Button, Input, Textarea } from '@nextui-org/react';
import { TbSend } from "react-icons/tb";
import { columns, borrowStatusOptions } from "../../../Data/RequestData";

import CustomTable from '@/components/CustomTable';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { useContext } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

function BorrowRequest() {
    const INITIAL_VISIBLE_COLUMNS = ["name", "quantity", "stock", "is_available", "actions"];
    const { user } = useContext(UserContext);
    const getCartItems = trpc.cartItems.getCartItems.useQuery();
    const addBorrowRequest = trpc.borrowRequest.addBorrowRequest.useMutation({
        onSuccess: () => {
            getCartItems.refetch();
        }
    });
    const cartItems = getCartItems.data?.cartItems;

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (user?.role === 'UNKNOWN') {
            toast.info('Please set your college and user role in the account page.');
            return;
        }

        const NOT_EQUIPMENTS_KEY = ['borrowDate', 'returnDate', 'purpose']
        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const data: Record<string, any> = Object.fromEntries(form.entries());
        const dataKeys = Object.keys(data);
        const cart = getCartItems.data;

        if (!cart) return;

        if (dataKeys.length == 3) {
            toast.error('The cart is empty, please add at least 1 equipment.');
            return;
        }

        const schema = z.object({
            numOfInputs: z.number().gt(3, 'The cart is empty, please add at least 1 equipment.'),
            borrowDateStr: z.string({ required_error: 'You need to provide the return date.' }).min(1, 'You need to provide the borrow date.'),
            returnDateStr: z.string({ required_error: 'You need to provide the return date.' }).min(1, 'You need to provide the return date.'),
            purpose: z.string({ required_error: 'Please provide a purpose for borrowing.' }).min(1, 'Please provide a purpose for borrowing.'),
        });

        try {
            schema.parse({
                numOfInputs: dataKeys.length,
                borrowDateStr: data.borrowDate,
                borrowDate: Date.parse(new Date(data.borrowDate).toString()),
                returnDateStr: data.returnDate,
                isAfterBorrowDate: Date.parse(new Date(data.returnDate).toString()) >= Date.parse(new Date(data.borrowDate).toString()),
                purpose: data.purpose
            })
        } catch (err: any) {
            const errorMessage = JSON.parse(err)[0].message;
            toast.error(errorMessage);
            return;
        }

        const borrowDateBeforeNow = new Date(data.borrowDate) > new Date();
        const returnDateAfterBorrowDate = new Date(data.returnDate) >= new Date(data.borrowDate);

        if (!borrowDateBeforeNow) {
            toast.error('The borrow date must be tomorrow or in the future.');
            return;
        }

        if (!returnDateAfterBorrowDate) {
            toast.error('The return date must be during or after the borrow date.');
            return;
        }

        for (let key of dataKeys) {
            if (!NOT_EQUIPMENTS_KEY.includes(key)) {
                const equipmentId = key;
                const quantity = Number(data[key]);

                updateEquipmentQuantity(equipmentId, quantity);
                continue;
            }
        }

        addBorrowRequest.mutate({
            cartId: cart.id,
            cartItems: cartItems,
            borrowDate: data.borrowDate,
            returnDate: data.returnDate,
            purpose: data.purpose,
        } as any);

        if (addBorrowRequest.isError) {
            toast.error('I apologize, we encountered an issue while sending the request.');
        }

        toast.success('You have sent the borrow request.');
    };

    const updateEquipmentQuantity = (itemId: string, itemQuantity: number) => {
        if (!cartItems) return;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id == itemId) {
                cartItems[i].quantity = itemQuantity;
                return;
            }
        }
    }

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">My Cart</h1>
            <hr />
            <div className='mt-5'>
                <form id='borrow-request' onSubmit={handleSubmit}>
                    <div className='flex gap-3'>
                        <div className='w-full'>
                            <CustomTable
                                columns={columns}
                                records={cartItems}
                                borrowStatusOptions={borrowStatusOptions}
                                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                                user={user}
                                type={'REQUEST'}
                                isLoading={getCartItems.isLoading}
                                getTableData={getCartItems}
                            />
                        </div>
                        <div className='shadow-md border-1 max-w-xs w-full h-max p-3 rounded-xl'>
                            <h1 className='mb-4 text-xl'><strong>To borrow</strong></h1>
                            <Input
                                name='borrowDate'
                                labelPlacement='inside'
                                label="Borrow Date"
                                placeholder='#'
                                type='date'
                                className='mb-2'
                            />
                            <Input
                                name='returnDate'
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