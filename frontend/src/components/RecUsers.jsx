import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRecommendedUsers } from '../lib/api';
import FriendCard from './FriendCard';
import NoFriends from './NoFriends';

const RecUsers = () => {


    const { data: recUsers = [], isLoading } = useQuery({
        queryKey: ['recUsers'],
        queryFn: getRecommendedUsers,
    })

    console.log({ recUsers })


    return (
        <div className='mx-3 md:mx-6 lg:mx-10'>
            <div className=' space-y-2'>
                <h1 className='font-bold text-3xl'>Meet New Learners</h1>
                <p>Discover perfect language exchange partners based on your profile</p>
            </div>
            <div>
                {
                    isLoading
                        ? <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg" />
                        </div>
                        : recUsers.length == 0
                            ? <NoFriends
                                title={'No recommendations available'}
                                description={' Check back later for new language partners!'} />
                            : recUsers.map(user => (
                                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                                    <FriendCard friend={user} />
                                </div>
                            ))
                }
            </div>
        </div>
    );
};

export default RecUsers;