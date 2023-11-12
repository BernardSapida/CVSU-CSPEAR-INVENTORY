import { getRequestStatusColor } from '@/utils/chip-utils';
import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive, BiWalk } from 'react-icons/bi';
import { BsBoxSeam } from 'react-icons/bs';

interface RequestStatusChipProps {
    status: string;
}

const RequestStatusChip: FunctionComponent<RequestStatusChipProps> = ({ status }) => {
    const getIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <BiTimeFive />;
            case 'to pickup':
                return <BiWalk />;
            case 'picked up':
                return <BsBoxSeam />;
            case 'returned':
                return <AiOutlineCheckCircle />;
        }
    }

    return <Chip
        size='sm'
        variant='flat'
        startContent={getIcon(status)}
        color={getRequestStatusColor(status)}
        className='text-tiny capitalize'
    >
        {status}
    </Chip>;
}

export default RequestStatusChip;