'use client'

import { Button } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';

interface CustomButtonProps {
    label: string,
    url: string
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({ label, url }) => {
    const router = useRouter();

    return (
        <Button
            size='sm'
            className='text-tiny'
            color='primary'
            onClick={() => router.push(url)}
        >{label}</Button>
    );
}

export default CustomButton;