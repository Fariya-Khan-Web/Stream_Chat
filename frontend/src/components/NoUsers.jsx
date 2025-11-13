import React from 'react';

const NoUsers = ({ title, description }) => {
    return (
        <div className='bg-base-300/40 text-center py-8 my-7 rounded-xl px-5 col-center'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <p className='opacity-15 text-sm'>no o  ne wants you lol</p>
            <p className='bg-sm max-w-[420px] mx-auto'>{description}</p>
        </div>
    );
};

export default NoUsers;