import { FunctionComponent } from 'react';

interface NotFoundProps {

}

const NotFound: FunctionComponent<NotFoundProps> = () => {
    return (
        <h1 className='text-3xl text-center font-bold mt-5'>
            Not Found
        </h1>
    );
}

export default NotFound;