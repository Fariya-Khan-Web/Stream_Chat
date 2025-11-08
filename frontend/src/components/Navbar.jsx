import { Bell, LogOutIcon, PaintRoller, ShipWheelIcon } from 'lucide-react';
import React from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
import toast from 'react-hot-toast';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {

    const { authUser } = useAuthUser()


    const queryClient = useQueryClient()
    const { mutate: logoutMutation, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            toast.success('Logged out')
        }
    })

    const handleLogout = () => {
        logoutMutation()
    }

    return (

        <div className="navbar bg-base-300 shadow-sm">

            {/* logo */}
            <div className="flex-1">
                <div className='flex items-center gap-2 text-3xl lg:hidden'>
                    <ShipWheelIcon className='size-9 text-primary ' />
                    <h2 className='font-mono fond-bold  bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary'>StreamChat</h2>
                </div>
            </div>


            <div className="flex-none mx-5">
                <div className='flex items-center'>

                    <div className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <Bell />
                        </div>
                    </div>

                    <ThemeSelector/>

                    {/* profile */}
                    <div className="btn btn-ghost btn-circle avatar mx-3">
                        <div className="w-10 rounded-full">
                            <img
                                alt={authUser?.fullName}
                                src={authUser?.profilePic} />
                        </div>
                    </div>

                    <button
                        disabled={isPending}
                        onClick={handleLogout}
                    >
                        <LogOutIcon />
                    </button>

                </div>


            </div>
        </div>

    );
};

export default Navbar;