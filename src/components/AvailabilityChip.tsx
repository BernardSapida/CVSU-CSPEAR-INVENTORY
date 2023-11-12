import { getAvailabilityColor } from '@/utils/chip-utils';
import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { LiaTimesCircle } from 'react-icons/lia';

interface AvailabilityChipProps {
    is_available: boolean;
}

const AvailabilityChip: FunctionComponent<AvailabilityChipProps> = ({ is_available }) => {
    const getIcon = (is_available: boolean) => {
        if (is_available) {
            return <AiOutlineCheckCircle />
        } else {
            return <LiaTimesCircle />;
        }
    }

    return <Chip
        size='sm'
        variant={'flat'}
        startContent={getIcon(is_available)}
        color={getAvailabilityColor(is_available)}
        className='text-tiny capitalize'
    >
        {is_available ? 'Available' : 'Not Available'}
    </Chip>;
}

export default AvailabilityChip;