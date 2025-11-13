import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getMyFriends } from '../lib/api';
import { Link } from 'react-router';
import { UsersIcon } from 'lucide-react';
import NoUsers from './NoUsers';
import FriendCard from './FriendCard';

const Friends = () => {

    const { data: friends=[], isLoading } = useQuery({
        queryKey: ['friends'],
        queryFn: getMyFriends,
    })


    return (
        <div className='mx-3 md:mx-6 my-8 lg:mx-10'>

            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Your Friends</h1>
                <Link
                    to='/notifications'
                    className='btn text-sm md:text-base rounded-3xl p-4'
                >
                    <UsersIcon className='size-4 md:size-5' />
                    Friend Requests
                </Link>
            </div>


            {
                isLoading
                    ? <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                    : friends.length == 0
                        ? <NoUsers
                            title={'No Friends Found!'}
                            description={'Connect with language partners below to start practicing together!'} />
                        : friends.map(friend => (
                            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                                <FriendCard friend={friend} />
                            </div>
                        ))
            }

        </div>
    );
};

export default Friends;