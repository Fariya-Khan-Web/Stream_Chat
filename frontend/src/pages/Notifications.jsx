import { useQuery } from '@tanstack/react-query';
import { getRequests } from '../lib/api';
import RequestCard from '../components/RequestCard';

const Notifications = () => {


    const { data: friendRequests, isLoading } = useQuery({
        queryKey: ['friendReqs'],
        queryFn: getRequests,
    })

    console.log(friendRequests)

    return (
        <div className='p-10'>
            <h1 className='text-3xl font-bold'>Notifications</h1>

            {/* requests */}
            <div className='py-10 max-w-5xl mx-auto'>
                <h2 className='text-2xl font-bold mb-7'>Friend Requests</h2>
                {
                    isLoading
                        ? (<div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg" />
                        </div>)
                        : (!friendRequests?.reqForMe?.length > 0
                            ? <div className='bg-base-300/40 text-center space-y-1 py-8 my-7 rounded-xl px-5 col-center'>
                                <h2 className='text-xl font-semibold'>No Requests to Show</h2>
                                <p className='opacity-20 text-sm'>no one wants you lol</p>
                                <p className='bg-sm max-w-[460px] mx-auto'>Friend requests will be visible if someone sends you a friend request. Invite your friends to join StreamChat</p>
                            </div>
                            : (friendRequests?.reqForMe?.map(req => (
                                <RequestCard key={req._id} request={req} />
                            )))
                        )
                }


            </div>


            {/* connnections */}
            <div className='py-6 max-w-5xl mx-auto'>
                <h2 className='text-2xl font-bold'>New Connections</h2>


            </div>

        </div>
    );
};

export default Notifications;