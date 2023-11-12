import { Dispatch, FunctionComponent, SetStateAction, useMemo } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { capitalize } from '@/utils/text';
import { trpc } from '@/lib/trpc/client';

interface EditModalProps {
    equipment: Record<string, any>;
    isOpen: boolean;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<RecordType>>;
    getTableData: any

}

const EditModal: FunctionComponent<EditModalProps> = ({ equipment, isOpen, onOpenChange, setData, getTableData }) => {
    const updateEquipment = trpc.equipments.updateEquipment.useMutation({
        onSettled: async () => {
            const { data } = await getTableData.refetch();
            toast.success('You have successfully updated the equipment.')
            setData(data);
        }
    });

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { name, stock, is_available } = Object.fromEntries(form.entries()) as any;

        updateEquipment.mutate({
            id: equipment.id,
            name,
            stock: Number(stock),
            is_available: is_available == 'available'
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
                                    name='is_available'
                                    placeholder="Select availability status"
                                    labelPlacement="outside"
                                    defaultSelectedKeys={[equipment.is_available ? 'available' : 'not available']}
                                >
                                    {
                                        ['available', 'not available'].map(status => (
                                            <SelectItem className='capitalize' key={status} value={status} textValue={capitalize(status)}>
                                                {status}
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
                                onPress={() => onClose()}
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