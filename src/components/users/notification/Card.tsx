import { FunctionComponent } from 'react';

import { getMessage } from '@/utils/chip-utils';
import CustomButton from '../../CustomButton';
import IconChip from '../../IconChip';

interface CardProps {
    title: string;
    borrow_status: string;
    time: string;
}

const Card: FunctionComponent<CardProps> = ({ title, borrow_status, time }) => {
    return (
        <div className='p-3 border-1 shadow rounded-md flex justify-between items-center'>
            <div>
                <div className='flex gap-1'>
                    <p className='mb-2'><strong>{title}</strong></p>
                    <IconChip status={borrow_status} />
                </div>
                <p className='text-sm'>{getMessage(borrow_status)}</p>

            </div>
            <div className='text-right'>
                <time className='block text-tiny text-default-400 mb-2'>{time}</time>
                <CustomButton
                    label={'View notification'}
                    url={'/user/view-borrow-request/1'}
                />
            </div>
        </div >
    );
}

export default Card;