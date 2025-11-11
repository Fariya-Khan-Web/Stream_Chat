import { useMutation, useQuery } from '@tanstack/react-query';
import { getRecommendedUsers, sendFriendReq } from '../lib/api';
import NoFriends from './NoFriends';
import UserCard from './UserCard';

const RecUsers = () => {


    const { data: recUsers = [], isLoading } = useQuery({
        queryKey: ['recUsers'],
        queryFn: getRecommendedUsers,
    })


    const { mutate: requestMutation, isLoading: reqLoad } = useMutation({
        mutationFn: sendFriendReq,
        onSuccess: () => { }
    })


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
                                        recUsers.map(user => (
                                            <div key={user._id} >
                                                <UserCard user={user} loading={reqLoad} />
                                            </div>
                                        ))
                                    }
                                </div>

                            )
                }
            </div>
        </div>
    );
};

export default RecUsers;