import { LoaderIcon } from 'lucide-react';
import React from 'react';

const PageLoader = () => {
    return (
        <div className='min-h-screen flex-center'>
            <LoaderIcon className='text-primary size-10 animate-spin' />
        </div>
    );
};

export default PageLoader;