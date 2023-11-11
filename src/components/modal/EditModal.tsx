import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';

interface EditModalProps {
    equipment: Record<string, any>;
    isOpen: boolean;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<Record<string, any>[]>>

}

const EditModal: FunctionComponent<EditModalProps> = ({ equipment, isOpen, onOpenChange, setData }) => {
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const { equipment_name, stock, status } = Object.fromEntries(form.entries()) as any;

        setData((eqs: any) => {
            return [...eqs.map((eq: any) => {
                if (eq.id == equipment.id) {
                    eq.equipment = equipment_name;
                    eq.stock = Number(stock);
                    eq.status = status;
                }

                return { ...eq };
            })]
        })
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
                                            <SelectItem className='capitalize' key={status} value={status} textValue={status}>
                                                <span className='capitalize'>{status}</span>
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