import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';

interface EditModalProps {
    equipment: Record<string, any>;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    setEquipmentsList: Dispatch<SetStateAction<{
        id: number;
        equipment: string;
        quantity: number;
        stock: number;
        status: string;
    }[]>>
}

const EditModal: FunctionComponent<EditModalProps> = ({ equipment, isOpen, onOpen, onOpenChange, setEquipmentsList }) => {
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { equipment_name, stock, status } = Object.fromEntries(form.entries()) as any;

        setEquipmentsList(eqs => {
            return [...eqs.map(eq => {
                if (eq.id == equipment.id) {
                    eq.equipment = equipment_name;
                    eq.stock = Number(stock);
                    eq.status = status;
                }

                return { ...eq };
            })]
        })
    };

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
                                    name='equipment_name'
                                    labelPlacement='inside'
                                    label="Equipment Name"
                                    type='text'
                                    size='sm'
                                    defaultValue={equipment.equipment}
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
                                    name='status'
                                    placeholder="Select Status"
                                    labelPlacement="outside"
                                    defaultSelectedKeys={[equipment.status]}
                                >
                                    {
                                        ['available', 'unavailable'].map(status => (
                                            <SelectItem key={status} value={status} textValue={capitalize(status)}>
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
                                onPress={() => {
                                    toast.success('You have successfully updated the equipment.')
                                    onClose()
                                }}
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