import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';

interface NotificationChipProps {
    is_viewed: boolean;
}

const NotificationChip: FunctionComponent<NotificationChipProps> = ({ is_viewed }) => {
    return <>
        {
            !is_viewed &&
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