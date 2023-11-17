import { Dispatch, FunctionComponent, SetStateAction, useMemo } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { capitalize } from '@/utils/text';
import { trpc } from '@/lib/trpc/client';

interface EditModalProps {
    equipment: Record<string, any>;
    onClose: () => void;
    isOpen: boolean;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<RecordType>>;
    getTableData: any

}

const EditModal: FunctionComponent<EditModalProps> = ({ equipment, onClose, isOpen, onOpenChange, setData, getTableData }) => {
    const updateEquipment = trpc.equipments.updateEquipment.useMutation({
        onSuccess: async () => {
            const { data } = await getTableData.refetch();
            toast.success('You have successfully updated the equipment.')
            onClose();
            setData(data);
        }
    });

    const handleSubmit = (event: React.SyntheticEvent) => {
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

        updateEquipment.mutate({
            equipmentId: equipment.id,
            name,
            stock: Number(stock),
            isAvailable: availability_status == 'available'
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            placement={'center'}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit equipment</ModalHeader>
                        <ModalBody>
                            <form id='edit-equipment' onSubmit={handleSubmit}>
                                <Input
                                    className='mb-2'
                                    name='name'
                                    labelPlacement='inside'
                                    label="Equipment Name"
                                    type='text'
                                    size='sm'
                                    defaultValue={equipment.name}
                                    placeholder='Equipment name'
                                />
                                <Input
                                    className='mb-2'
                                    name='stock'
                                    labelPlacement='inside'
                                    label="Stock"
                                    type='number'
                                    size='sm'
                                    min='0'
                                    defaultValue={equipment.stock}
                                />
                                <Select
                                    className='mb-2'
                                    name='availability_status'
                                    placeholder="Select availability status"
                                    labelPlacement="outside"
                                    defaultSelectedKeys={[equipment.isAvailable ? 'available' : 'not available']}
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
                                form='edit-equipment'
                            >
                                Update
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default EditModal;