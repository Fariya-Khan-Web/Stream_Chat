import { useMutation } from '@tanstack/react-query';
import React from 'react';

const RequestCard = ({ request }) => {

    const { _id, fullName, profilePic, nativeLanguage, learningLanguage } = request.sender


    const {mutate: acceptReqMutation} = useMutation({
        // mutationFn: 
    })


    const handleAccept = () => {

    }

    return (
        <div className='bg-base-300 p-4 px-6 rounded-2xl md:flex items-center justify-between'>

            <div className='flex gap-3'>
                <img
                    src={profilePic}
                    alt={fullName}
                    className='size-14'
                />
                <div>
                    <h3 className='font-semibold text-lg'>{fullName}</h3>
                    <div className=''>
                        <span className='capitalize pb-1 badge badge-secondary'>Native: {nativeLanguage}</span>
                        <span className='capitalize pb-1 badge badge-outline md:mx-1.5'>Learning: {learningLanguage}</span>
                    </div>
                </div>

            </div>


            {/* accept */}
            <button
                className='btn btn-primary pb-1'
                onClick={() => handleAccept()}
            >
                Accept
            </button>

        </div>
    );
};

export default RequestCard;