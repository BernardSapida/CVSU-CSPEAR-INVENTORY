'use client'

import { Button } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';

interface CustomButtonProps {
    label: string,
    url: string,
    cb?: () => void,
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({ label, url, cb }) => {
    const router = useRouter();

    if (cb) {
        return (
            <Button
                size='sm'
                className='text-tiny'
                color='primary'
                onClick={() => {
                    cb();
                    router.push(url);
                }}
            >{label}</Button>
        );
    } else {
        return (
            <Button
                size='sm'
                className='text-tiny'
                color='primary'
                onClick={() => router.push(url)}
            >{label}</Button>
        );
    }
}

export default CustomButton;