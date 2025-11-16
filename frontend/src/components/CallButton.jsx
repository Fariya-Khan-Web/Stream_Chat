import { VideoIcon } from 'lucide-react';
import React from 'react';

const CallButton = ({handleVideoCall}) => {
    return (
        <button 
        onClick={handleVideoCall}
        className='btn btn-success absolute right-2.5 top-2'>
            <VideoIcon className='text-white'/>
        </button>
    );
};

export default CallButton;