import { LoaderIcon } from 'lucide-react';
import React from 'react';
import { useThemeStore } from '../store/useThemeStore';

const PageLoader = () => {

    const { theme } = useThemeStore()

    return (
        <div className='min-h-screen flex-center' data-theme={theme}>
            <LoaderIcon className='text-primary size-10 animate-spin' />
        </div>
    );
};

export default PageLoader;