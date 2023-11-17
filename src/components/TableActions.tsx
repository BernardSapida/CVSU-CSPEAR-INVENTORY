import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

interface TableActionsProps {
    equipment: Equipment;
    role?: Role;
    type: TableType;
    CB: ((eq: Equipment, action?: any) => void);
}

const TableActions: FunctionComponent<TableActionsProps> = ({ equipment, role, type, CB }) => {
    const router = useRouter();

    const UserCatalogActions = (
        <Button
            startContent={<IoMdAdd />}
            size='sm'
            color="primary"
            onClick={() => CB(equipment)}
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
                startContent={<AiOutlineEdit />}
                aria-labelledby='Edit equipment button'
                size='sm'
                className='bg-default-900 text-white'
                onClick={() => CB(equipment, 'update')}
                isIconOnly
            />
            <Button
                startContent={<FaRegTrashAlt />}
                aria-labelledby='Delete equipment button'
                size='sm'
                color="danger"
                onClick={() => CB(equipment, 'delete')}
                isIconOnly
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
        if (role === 'Student' || role === 'Faculty') {
            switch (type) {
                case 'CATALOG':
                    return UserCatalogActions
                case 'REQUEST':
                    return UserRequestActions
            }
        }

        if (role === 'Admin') {
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