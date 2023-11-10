import { Chip } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import CustomButton from '../../CustomButton';

interface CardProps {
    title: string;
    status: string;
    time: string;
}

const Card: FunctionComponent<CardProps> = ({ title, status, time }) => {

    return (
        <div className='p-3 border-1 shadow rounded-md flex justify-between items-center'>
            <div>
                <p className='mb-2'><strong>{title}</strong></p>
                <Chip
                    size='sm'
                    variant='flat'
                    startContent={<AiOutlineCheckCircle />}
                    color='success'
                    className='text-tiny'
                >
                    {status}
                </Chip>
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