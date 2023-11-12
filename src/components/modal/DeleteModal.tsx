import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc/client';

interface DeleteModalProps {
    equipment: Record<string, any>;
    isOpen: boolean;
    onOpenChange: () => void;
    setData: Dispatch<SetStateAction<RecordType>>;
    getTableData: any
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ equipment, isOpen, onOpenChange, setData, getTableData }) => {
    const deleteEquipment = trpc.equipments.deleteEquipment.useMutation({
        onSettled: async () => {
            const { data } = await getTableData.refetch();
            toast.success('You have successfully deleted the equipment.')
            setData(data);
        }
    });

    const deleteHandler = (onClose: () => void) => {
        deleteEquipment.mutate({ id: equipment.id })
        onClose();
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
                        <ModalHeader className="flex flex-col gap-1">Delete equipment</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete <strong>{equipment.equipment}</strong>?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={() => deleteHandler(onClose)}>
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