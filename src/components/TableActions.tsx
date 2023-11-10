import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'sonner';

interface TableActionsProps {
    equipment: any;
    role: UserRole;
    type: TableType;
    CB: ((eq?: any, action?: any) => void);
}

const TableActions: FunctionComponent<TableActionsProps> = ({ equipment, role, type, CB }) => {
    const router = useRouter();

    const UserCatalogActions = (
        <Button
            startContent={<IoMdAdd />}
            size='sm'
            color="primary"
            onClick={CB}
        >
            Add to borrow
        </Button>
    )

    const UserRequestActions = (
        <Button
            startContent={<AiOutlineDelete />}
            size='sm'
            color="danger"
            isIconOnly
            onClick={() => CB(equipment)}
        />

    )

    const AdminCatalogActions = (
        <div className="flex gap-1">
            <Button
                isIconOnly
                startContent={<AiOutlineEdit />}
                size='sm'
                className='bg-default-900 text-white'
                onClick={() => CB(equipment, 'update')}
            />
            <Button
                isIconOnly
                startContent={<FaRegTrashAlt />}
                size='sm'
                color="danger"
                onClick={() => CB(equipment, 'delete')}
            />
        </div>
    )

    const AdminRequestActions = (
        <div className="flex gap-1">
            <Button
                size='sm'
                className='bg-default-900 text-white'
                onClick={() => {
                    router.push(`/admin/borrow-requests/${equipment.id}`)
                }}
            >View request</Button>
        </div>
    )

    const ActionElements = () => {
        if (role === 'USER') {
            switch (type) {
                case 'CATALOG':
                    return UserCatalogActions
                case 'REQUEST':
                    return UserRequestActions
            }
        }

        if (role === 'ADMIN') {
            switch (type) {
                case 'CATALOG':
                    return AdminCatalogActions
                case 'REQUEST':
                    return AdminRequestActions
            }
        }
    }

    return <ActionElements />;
}

export default TableActions;