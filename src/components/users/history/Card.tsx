import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import CustomButton from '../../CustomButton';
import IconChip from '@/components/IconChip';

interface CardProps {
    title: string;
    borrow_status: string;
    equipment_condition: string;
    time: string;
}

const Card: FunctionComponent<CardProps> = ({ title, borrow_status, equipment_condition, time }) => {

    return (
        <div className='p-3 border-1 shadow rounded-md flex justify-between items-center'>
            <div>
                <p className='mb-2'><strong>{title}</strong></p>
                <div className='flex gap-2 items-center my-2'>
                    <p className='text-sm font-semibold'>Borrow Status: </p>
                    <IconChip status={borrow_status} />
                </div>
                <div className='flex gap-2 items-center my-2'>
                    <p className='text-sm font-semibold'>Equipment Condtion: </p>
                    <IconChip status={equipment_condition} />
                </div>
            </div>
            <div className='text-right'>
                <time className='block text-tiny text-default-400 mb-2'>{time}</time>
                <CustomButton
                    label={'View details'}
                    url={'/user/view-borrow-request/1'}
                />
            </div>
        </div>
    );
}

export default Card;