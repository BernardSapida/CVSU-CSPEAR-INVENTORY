import { FunctionComponent } from 'react';

import { getNotificationMessage } from '@/utils/chip-utils';
import CustomButton from '../../CustomButton';
import IconChip from '../../RequestStatusChip';
import NotificationChip from '@/components/NotificationChip';

interface CardProps {
    title: string;
    borrowStatus: string;
    time: string;
    isViewed: boolean;
    url: string;
}

const Card: FunctionComponent<CardProps> = ({ title, borrowStatus, time, isViewed, url }) => {
    return (
        <div className='p-3 border-1 shadow rounded-md flex justify-between items-center'>
            <div>
                <div className='flex gap-1'>
                    <p className='mb-2'><strong>{title}</strong></p>
                    <IconChip status={borrowStatus} />
                    <NotificationChip isViewed={isViewed} />
                </div>
                <p className='text-sm'>{getNotificationMessage(borrowStatus)}</p>

            </div>
            <div className='text-right'>
                <time className='block text-tiny text-default-400 mb-2'>{time}</time>
                <CustomButton
                    label={'View notification'}
                    url={url}
                />
            </div>
        </div >
    );
}

export default Card;