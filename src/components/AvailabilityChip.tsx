import { getAvailabilityColor } from '@/utils/chip-utils';
import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { LiaTimesCircle } from 'react-icons/lia';

interface AvailabilityChipProps {
    isAvailable: boolean;
}

const AvailabilityChip: FunctionComponent<AvailabilityChipProps> = ({ isAvailable }) => {
    const getIcon = (isAvailable: boolean) => {
        if (isAvailable) {
            return <AiOutlineCheckCircle />
        } else {
            return <LiaTimesCircle />;
        }
    }

    return <Chip
        size='sm'
        variant={'flat'}
        startContent={getIcon(isAvailable)}
        color={getAvailabilityColor(isAvailable)}
        className='text-tiny capitalize'
    >
        {isAvailable ? 'Available' : 'Not Available'}
    </Chip>;
}

export default AvailabilityChip;