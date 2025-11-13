import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecommendedUsers, getSentRequests, sendFriendReq } from '../lib/api';
import NoFriends from './NoFriends';
import UserCard from './UserCard';
import getLanguageFlag from '../hooks/useFlag';
import { CheckCircleIcon, MapPin, UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const RecUsers = () => {

    const [outGoingFriendReqsIds, setOutGoingFriendReqIds] = useState(new Set())
    const queryClient = useQueryClient()

    const { data: recUsers = [], isLoading } = useQuery({
        queryKey: ['recUsers'],
        queryFn: getRecommendedUsers,
    })


    const { data: outGoingFriendReqs } = useQuery({
        queryKey: ['outgoingReqs'],
        queryFn: getSentRequests,
    })

    const { mutate: requestMutation, isLoading: reqLoad } = useMutation({
        mutationFn: sendFriendReq,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['outgoingReqs'] }) }
    })


    useEffect(() => {
        const outGoingIds = new Set()
        if (outGoingFriendReqs && outGoingFriendReqs.length > 0) {
            outGoingFriendReqs.forEach(req => {
                outGoingIds.add(req.recipient._id)
            })
            setOutGoingFriendReqIds(outGoingIds)
        }
        console.log("??????",{outGoingIds})
    }, [outGoingFriendReqs])

    console.log({ outGoingFriendReqs })
    console.log({ outGoingFriendReqsIds })
    console.log({ recUsers })

    return (
        <div className='mx-3 md:mx-6 lg:mx-10'>
            <div className=' space-y-2'>
                <h1 className='font-bold text-3xl'>Meet New Learners</h1>
                <p>Discover perfect language exchange partners based on your profile</p>
            </div>
            <div className='my-8'>
                {
                    isLoading
                        ? <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                        : recUsers.length == 0
                            ? <NoFriends
                                title={'No recommendations available'}
                                description={' Check back later for new language partners!'} />

                            : (
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        recUsers?.map(user => {
                                            const hasRequestBeenSent = outGoingFriendReqsIds?.has(user?._id);

                                            console.log(user.fullName, { hasRequestBeenSent })

                                            return (
                                                <div className='p-4 rounded-xl bg-base-300/80'>

                                                    <div className='flex items-center gap-2'>
                                                        <img src={user.profilePic} className='size-13' alt="profile picture" />
                                                        <div>
                                                            <h2 className='font-semibold text-lg'>{user.fullName}</h2>
                                                            <p className='text-sm flex items-center gap-1 '><MapPin className='size-4' />{user.location}</p>
                                                        </div>
                                                    </div>


                                                    <div className='space-x-2 my-4'>
                                                        <span className='capitalize badge badge-secondary my-1'>
                                                            <img
                                                                className='w-5 h-4'
                                                                alt={user.nativeLanguage}
                                                                src={getLanguageFlag(user.nativeLanguage)}
                                                            />
                                                            Native: {user.nativeLanguage}
                                                        </span>
                                                        <span className='capitalize badge badge-outline my-1'>
                                                            <img
                                                                className='w-5 h-4'
                                                                alt={user.learningLanguage}
                                                                src={getLanguageFlag(user.learningLanguage)}
                                                            />
                                                            Learning: {user.learningLanguage}
                                                        </span>
                                                    </div>

                                                    <p className='pb-2'>{user.bio}</p>


                                                    {/* Action button */}
                                                    <button
                                                        className={`btn w-full rounded-2xl mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                                                            } `}
                                                        onClick={() => requestMutation(user._id)}
                                                        disabled={hasRequestBeenSent || reqLoad}
                                                    >
                                                        {hasRequestBeenSent ? (
                                                            <>
                                                                <CheckCircleIcon className="size-4 mr-2" />
                                                                Request Sent
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserPlusIcon className="size-4 mr-2" />
                                                                Send Friend Request
                                                            </>
                                                        )}
                                                    </button>



                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            )
                }
            </div>
        </div>
    );
};

export default RecUsers;