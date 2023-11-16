import { Dispatch, FunctionComponent, SetStateAction, useRef, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc/client';
import { capitalize } from '@/utils/text';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<RecordType>>;
    getTableData: any
}

const AddModal: FunctionComponent<AddModalProps> = ({ isOpen, onClose, onOpenChange, setData, getTableData }) => {
    const addEquipment = trpc.equipments.addEquipment.useMutation({
        onSuccess: async () => {
            const { data } = await getTableData.refetch();
            toast.success('You have successfully added new equipment.');
            onClose();
            setData(data);
        },
    });

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { name, stock, availability_status } = Object.fromEntries(form.entries()) as any;

        if (name === '') {
            toast.error('Please provide the equipment name.');
            return;
        } else if (stock <= 0) {
            toast.error('The stock must exceed zero.');
            return;
        } else if (availability_status == undefined) {
            toast.error('Choose the equipment availability status.');
            return;
        }

        const newEquipment = {
            name: name,
            is_available: availability_status == 'available',
            stock: Number(stock),
        } as Equipment;

        addEquipment.mutate(newEquipment);
    };

    return (
        <Modal
            isOpen={isOpen}
            placement={'center'}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add equipment</ModalHeader>
                        <ModalBody>
                            <form id='add-equipment' onSubmit={handleSubmit}>
                                <Input
                                    className='mb-2'
                                    name='name'
                                    labelPlacement='inside'
                                    label="Equipment Name"
                                    type='text'
                                    size='sm'
                                />
                                <Input
                                    className='mb-2'
                                    name='stock'
                                    labelPlacement='inside'
                                    label="Stock"
                                    type='number'
                                    size='sm'
                                    min='0'
                                />
                                <Select
                                    className='mb-2'
                                    name='availability_status'
                                    placeholder="Select Status"
                                    labelPlacement="outside"
                                    defaultSelectedKeys={['Available']}
                                >
                                    {
                                        ['available', 'not available'].map(status => (
                                            <SelectItem key={status} value={status} textValue={capitalize(status)}>
                                                {capitalize(status)}
                                            </SelectItem>
                                        ))
                                    }
                                </Select>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                color="primary"
                                form='add-equipment'
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default AddModal;