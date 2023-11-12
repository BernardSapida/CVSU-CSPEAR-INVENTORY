import { getConditionColor } from '@/utils/chip-utils';
import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsQuestionCircle } from 'react-icons/bs';
import { LiaTimesCircle } from 'react-icons/lia';

interface ConditionChipProps {
    status: string;
}

const ConditionChip: FunctionComponent<ConditionChipProps> = ({ status }) => {
    const getIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'good':
                return <AiOutlineCheckCircle />;

            case 'misplaced':
                return <BsQuestionCircle />
            case 'damaged':
                return <LiaTimesCircle />
        }
    }

    return <Chip
        size='sm'
        variant='flat'
        startContent={getIcon(status)}
        color={getConditionColor(status)}
        className='text-tiny capitalize'
    >
        {status}
    </Chip>;
}

export default ConditionChip;