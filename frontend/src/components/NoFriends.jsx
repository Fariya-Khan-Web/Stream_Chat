import React from 'react';

const NoFriends = ({title, description}) => {
    return (
        <div className='bg-base-300/40 text-center space-y-2 py-8 my-7 rounded-xl px-5 col-center'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <p className='bg-sm max-w-[420px] mx-auto'>{description}</p>
        </div>
    );
};

export default NoFriends;