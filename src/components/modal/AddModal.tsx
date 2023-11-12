import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc/client';

interface AddModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<RecordType>>;
    getTableData: any
}

const AddModal: FunctionComponent<AddModalProps> = ({ isOpen, onOpenChange, setData, getTableData }) => {
    const addEquipment = trpc.equipments.addEquipment.useMutation({
        onSettled: async () => {
            const { data } = await getTableData.refetch();
            toast.success('You have successfully added new equipment.');
            setData(data);
        }
    });

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { name, stock, is_available } = Object.fromEntries(form.entries()) as any;
        const newEquipment = {
            name: name,
            is_available: is_available == 'available',
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
                                    name='status'
                                    placeholder="Select Status"
                                    labelPlacement="outside"
                                // defaultSelectedKeys={['Available']}
                                >
                                    {
                                        ['available', 'not available'].map(status => (
                                            <SelectItem key={status} value={status} textValue={status}>
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
                                form='add-equipment'
                                onClick={onClose}
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