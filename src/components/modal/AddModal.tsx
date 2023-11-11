import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';

interface AddModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<Record<string, any>[]>>
}

const AddModal: FunctionComponent<AddModalProps> = ({ isOpen, onOpenChange, setData }) => {
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const form = new FormData(target);
        const input = Object.fromEntries(form.entries());

        setData(prevState => {
            const size = prevState.length + 1;

            return [
                ...prevState,
                {
                    id: size,
                    equipment: input.name.toString(),
                    status: input.status.toString(),
                    stock: input.stock.toString(),
                    quantity: 1
                } as any
            ]
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
                                        ['available', 'unavailable'].map(status => (
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
                                onPress={() => {
                                    toast.success('You have successfully added new equipment.')
                                    // onClose()
                                }}
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