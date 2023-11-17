import { FunctionComponent } from 'react';

import CustomButton from '../../CustomButton';
import NotificationChip from '@/components/NotificationChip';

interface CardProps {
    title: string;
    description: string;
    isViewed: boolean;
    time: string;
    url: string;
}

const Card: FunctionComponent<CardProps> = ({ title, description, isViewed, time, url }) => {
    return (
        <div className='p-3 border-1 shadow rounded-md flex justify-between items-center'>
            <div>
                <div className='flex gap-1'>
                    <p className='mb-2'><strong>{title}</strong></p>
                    <NotificationChip isViewed={isViewed} />
                </div>
                <p className='text-sm'>{description}</p>

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