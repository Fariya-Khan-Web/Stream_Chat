import { MessageSquareIcon } from 'lucide-react';
import React from 'react';

const Connected = ({ connection }) => {

    const { fullName, profilePic } = connection.recipient

    return (
        <div className='rounded-2xl flex justify-between bg-base-300 p-4 px-6'>
            <div className='flex gap-3'>
                <img className='size-11' src={profilePic} alt={fullName} />
                <div>
                    <h2 className='font-semibold'>{fullName}</h2>
                    <p className='opacity-80 text-sm'>{fullName.split(' ')[0]} accepted your friend request</p>
                    <p></p>
                </div>
            </div>

            <div className='badge badge-secondary'> <MessageSquareIcon className='size-4'/> New Friend</div>
        </div>
    );
};

export default Connected;