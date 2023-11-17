import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';

interface NotificationChipProps {
    isViewed: boolean;
}

const NotificationChip: FunctionComponent<NotificationChipProps> = ({ isViewed }) => {
    return <>
        {
            !isViewed &&
            <Chip
                size='sm'
                variant={'shadow'}
                color={'danger'}
                className='text-tiny capitalize'
            >
                New
            </Chip>
        }

    </>;
}

export default NotificationChip;