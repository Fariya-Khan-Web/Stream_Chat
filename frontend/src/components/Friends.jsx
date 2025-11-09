import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getMyFriends } from '../lib/api';
import { Link } from 'react-router';
import { UsersIcon } from 'lucide-react';
import NoFriends from './NoFriends';
import FriendCard from './FriendCard';

const Friends = () => {

    const { data: friends, isLoading } = useQuery({
        queryKey: ['friends'],
        queryFn: getMyFriends,
    })

    console.log({ friends })

    return (
        <div className='py-8 mx-10'>

            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Your Friends</h1>
                <Link
                    to='/notifications'
                    className='btn rounded-3xl p-4'
                >
                    <UsersIcon className='size-5' />
                    Friend Requests
                </Link>
            </div>


            {
                isLoading
                    ? <div><span className='loading-dots' /></div>
                    : friends.length == 0
                        ? <NoFriends />
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