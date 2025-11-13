import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { acceptRequest } from '../lib/api';
import toast from 'react-hot-toast';

const RequestCard = ({ request }) => {

    const { fullName, profilePic, nativeLanguage, learningLanguage } = request.sender


    const queryClient = useQueryClient()
    const { mutate: acceptReqMutation, isPending } = useMutation({
        mutationFn: acceptRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] })
            queryClient.invalidateQueries({ queryKey: ['friendReqs'] })
            toast.success("Account Created")
        }
    })


    const handleAccept = () => {
        acceptReqMutation(request._id)
    }

    return (
        <div className='bg-base-300 p-4 px-6 mt-3.5 rounded-2xl md:flex items-center justify-between'>

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
                onClick={handleAccept}
                disabled={isPending}
            >
                Accept
            </button>

        </div>
    );
};

export default RequestCard;