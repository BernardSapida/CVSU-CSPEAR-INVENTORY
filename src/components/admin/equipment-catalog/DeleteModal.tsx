import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';

interface DeleteModalProps {
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

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ equipment, isOpen, onOpen, onOpenChange, setEquipmentsList }) => {
    return (
        <Modal
            isOpen={isOpen}
            placement={'center'}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete equipment</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete <strong>{equipment.equipment}</strong>?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={() => {
                                setEquipmentsList(eqs => eqs.filter(eq => eq.id != equipment.id))
                                toast.success('You have successfully deleted the equipment.')
                                onClose();
                            }}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default DeleteModal;