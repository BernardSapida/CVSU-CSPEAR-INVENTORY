import { FunctionComponent } from 'react';

import { getMessage } from '@/utils/chip-utils';
import CustomButton from '../../CustomButton';
import ChipWithIcon from '../../IconChip';

interface CardProps {
    title: string;
    status: string;
    time: string;
}

const Card: FunctionComponent<CardProps> = ({ title, status, time }) => {
    return (
        <div className='p-3 border-1 shadow rounded-md flex justify-between items-center'>
            <div>
                <div className='flex gap-1'>
                    <p className='mb-2'><strong>{title}</strong></p>
                    <ChipWithIcon status={status} />
                </div>
                <p className='text-sm'>{getMessage(status)}</p>

            </div>
            <div className='text-right'>
                <time className='block text-tiny text-default-400 mb-2'>{time}</time>
                <CustomButton
                    label={'View notification'}
                    url={'/admin/borrow-requests/1'}
                />
            </div>
        </div >
    );
}

export default Card;