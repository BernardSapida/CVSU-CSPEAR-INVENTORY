import { getColor } from '@/utils/chip-utils';
import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { LiaTimesCircle } from 'react-icons/lia';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive, BiWalk } from 'react-icons/bi';
import { BsBoxSeam, BsQuestionCircle } from 'react-icons/bs';

interface IconChipProps {
    status: string;
    variant?: string;
}

const IconChip: FunctionComponent<IconChipProps> = ({ status, variant = "flat" }) => {
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
            case 'good':
                return <AiOutlineCheckCircle />;
            case 'available':
                return <AiOutlineCheckCircle />;
            case 'misplaced':
                return <BsQuestionCircle />
            case 'damaged':
                return <LiaTimesCircle />
            case 'unavailable':
                return <LiaTimesCircle />
        }
    }

    return <Chip
        size='sm'
        variant='flat'
        startContent={getIcon(status)}
        color={getColor(status)}
        className='text-tiny capitalize'
    >
        {status}
    </Chip>;
}

export default IconChip;